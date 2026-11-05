TYPE
  LOGLEVEL : (CRITICAL, WARNING, INFO, DEBUG) := INFO;
END_TYPE

FUNCTION_BLOCK LOGGER
  VAR_INPUT
    TRIG : BOOL;
    MSG : STRING;
    LEVEL : LOGLEVEL := INFO;
  END_VAR
  VAR
    TRIG0 : BOOL;
  END_VAR

  IF TRIG AND NOT TRIG0 THEN
  {{
   LogMessage(GetFbVar(LEVEL),(char*)GetFbVar(MSG, .body),GetFbVar(MSG, .len));
  }}
  END_IF;
  TRIG0:=TRIG;
END_FUNCTION_BLOCK


PROGRAM program0
  VAR
    valveA : BOOL;
    valveB : BOOL;
    valveC : BOOL;
    alarm : BOOL;
    indicator : BOOL;
    start : BOOL;
    stop : BOOL;
  END_VAR
  VAR_EXTERNAL
    valveAext : BOOL;
    valveBext : BOOL;
    valveCext : BOOL;
  END_VAR
  VAR
    mixer : BOOL;
    heater : BOOL;
  END_VAR
  VAR_EXTERNAL
    heaterExt : BOOL;
    level : INT;
  END_VAR
  VAR
    level0 : INT;
  END_VAR
  VAR_EXTERNAL
    temp : INT;
  END_VAR
  VAR
    temp0 : INT;
  END_VAR
  VAR
    tempSet : INT;
    tempSet0 : INT;
  END_VAR
  VAR
    TOF0 : TOF;
    TP1 : TP;
    CTU0 : CTU;
    R_TRIG1 : R_TRIG;
    R_TRIG2 : R_TRIG;
    R_TRIG3 : R_TRIG;
    F_TRIG1 : F_TRIG;
    _TMP_GE28_OUT : BOOL;
    _TMP_GT12_OUT : BOOL;
    F_TRIG2 : F_TRIG;
    _TMP_GT40_OUT : BOOL;
    F_TRIG3 : F_TRIG;
    F_TRIG4 : F_TRIG;
    _TMP_LT58_OUT : BOOL;
    F_TRIG5 : F_TRIG;
    R_TRIG4 : R_TRIG;
  END_VAR

  R_TRIG1(CLK := start);
  IF R_TRIG1.Q THEN
    indicator := TRUE; (*set*)
  END_IF;
  valveAext := valveA;
  R_TRIG2(CLK := stop);
  IF R_TRIG2.Q THEN
    indicator := FALSE; (*reset*)
  END_IF;
  R_TRIG3(CLK := start);
  TOF0(IN := R_TRIG3.Q, PT := T#5s);
  valveA := TOF0.Q;
  F_TRIG1(CLK := valveA);
  IF indicator AND F_TRIG1.Q THEN
    valveB := TRUE; (*set*)
  END_IF;
  _TMP_GE28_OUT := GE(level, 80);
  IF _TMP_GE28_OUT THEN
    valveB := FALSE; (*reset*)
  END_IF;
  _TMP_GT12_OUT := GT(level, 85);
  alarm := _TMP_GT12_OUT;
  valveBext := valveB;
  F_TRIG2(CLK := valveB);
  IF indicator AND F_TRIG2.Q THEN
    heater := TRUE; (*set*)
  END_IF;
  _TMP_GT40_OUT := GT(temp, tempSet);
  IF _TMP_GT40_OUT THEN
    heater := FALSE; (*reset*)
  END_IF;
  heaterExt := heater;
  F_TRIG3(CLK := valveB);
  TP1(IN := F_TRIG3.Q, PT := T#10s);
  mixer := TP1.Q;
  F_TRIG4(CLK := mixer);
  IF indicator AND F_TRIG4.Q THEN
    valveC := TRUE; (*set*)
  END_IF;
  _TMP_LT58_OUT := LT(level, 10);
  IF _TMP_LT58_OUT THEN
    valveC := FALSE; (*reset*)
  END_IF;
  valveCext := valveC;
  F_TRIG5(CLK := valveC);
  R_TRIG4(CLK := F_TRIG5.Q);
  CTU0(CU := R_TRIG4.Q, R := stop, PV := 999);
  IF CTU0.Q THEN
    indicator := FALSE; (*reset*)
  END_IF;
  level0 := level;
  temp0 := temp;
  tempSet0 := tempSet;
END_PROGRAM


CONFIGURATION Config0
  VAR_GLOBAL
    valveAext : BOOL := 0;
    valveBext : BOOL := 0;
    valveCext : BOOL := 0;
    heaterExt : BOOL := 0;
    level : INT := 0;
    temp : INT := 30;
  END_VAR

  RESOURCE Res0 ON PLC
    TASK task0(INTERVAL := T#100ms,PRIORITY := 0);
    PROGRAM instance0 WITH task0 : program0;
  END_RESOURCE
END_CONFIGURATION
