PROGRAM program0
  VAR
    valveA AT %QX0.1 : BOOL;
    valveB AT %QX0.2 : BOOL;
    valveC AT %QX0.3 : BOOL;
    alarm AT %QX0.6 : BOOL;
    indicator AT %QX0.0 : BOOL;
    start AT %IX0.0 : BOOL;
    stop AT %IX0.1 : BOOL;
  END_VAR
  VAR_EXTERNAL
    valveAext : BOOL;
    valveBext : BOOL;
    valveCext : BOOL;
  END_VAR
  VAR
    mixer AT %QX0.4 : BOOL;
    heater AT %QX0.5 : BOOL;
  END_VAR
  VAR_EXTERNAL
    heaterExt : BOOL;
    level : INT;
  END_VAR
  VAR
    level0 AT %MW0 : INT;
  END_VAR
  VAR_EXTERNAL
    temp : INT;
  END_VAR
  VAR
    temp0 : INT;
  END_VAR
  VAR
    tempSet AT %IW0 : INT;
    tempSet0 AT %IW1 : INT;
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
