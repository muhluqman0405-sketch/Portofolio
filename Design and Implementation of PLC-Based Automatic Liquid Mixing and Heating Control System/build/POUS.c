void LOGGER_init__(LOGGER *data__, BOOL retain) {
  __INIT_VAR(data__->EN,__BOOL_LITERAL(TRUE),retain)
  __INIT_VAR(data__->ENO,__BOOL_LITERAL(TRUE),retain)
  __INIT_VAR(data__->TRIG,__BOOL_LITERAL(FALSE),retain)
  __INIT_VAR(data__->MSG,__STRING_LITERAL(0,""),retain)
  __INIT_VAR(data__->LEVEL,LOGLEVEL__INFO,retain)
  __INIT_VAR(data__->TRIG0,__BOOL_LITERAL(FALSE),retain)
}

// Code part
void LOGGER_body__(LOGGER *data__) {
  // Control execution
  if (!__GET_VAR(data__->EN)) {
    __SET_VAR(data__->,ENO,,__BOOL_LITERAL(FALSE));
    return;
  }
  else {
    __SET_VAR(data__->,ENO,,__BOOL_LITERAL(TRUE));
  }
  // Initialise TEMP variables

  if ((__GET_VAR(data__->TRIG,) && !(__GET_VAR(data__->TRIG0,)))) {
    #define GetFbVar(var,...) __GET_VAR(data__->var,__VA_ARGS__)
    #define SetFbVar(var,val,...) __SET_VAR(data__->,var,__VA_ARGS__,val)

   LogMessage(GetFbVar(LEVEL),(char*)GetFbVar(MSG, .body),GetFbVar(MSG, .len));
  
    #undef GetFbVar
    #undef SetFbVar
;
  };
  __SET_VAR(data__->,TRIG0,,__GET_VAR(data__->TRIG,));

  goto __end;

__end:
  return;
} // LOGGER_body__() 





void PROGRAM0_init__(PROGRAM0 *data__, BOOL retain) {
  __INIT_VAR(data__->VALVEA,__BOOL_LITERAL(FALSE),retain)
  __INIT_VAR(data__->VALVEB,__BOOL_LITERAL(FALSE),retain)
  __INIT_VAR(data__->VALVEC,__BOOL_LITERAL(FALSE),retain)
  __INIT_VAR(data__->ALARM,__BOOL_LITERAL(FALSE),retain)
  __INIT_VAR(data__->INDICATOR,__BOOL_LITERAL(FALSE),retain)
  __INIT_VAR(data__->START,__BOOL_LITERAL(FALSE),retain)
  __INIT_VAR(data__->STOP,__BOOL_LITERAL(FALSE),retain)
  __INIT_EXTERNAL(BOOL,VALVEAEXT,data__->VALVEAEXT,retain)
  __INIT_EXTERNAL(BOOL,VALVEBEXT,data__->VALVEBEXT,retain)
  __INIT_EXTERNAL(BOOL,VALVECEXT,data__->VALVECEXT,retain)
  __INIT_VAR(data__->MIXER,__BOOL_LITERAL(FALSE),retain)
  __INIT_VAR(data__->HEATER,__BOOL_LITERAL(FALSE),retain)
  __INIT_EXTERNAL(BOOL,HEATEREXT,data__->HEATEREXT,retain)
  __INIT_EXTERNAL(INT,LEVEL,data__->LEVEL,retain)
  __INIT_VAR(data__->LEVEL0,0,retain)
  __INIT_EXTERNAL(INT,TEMP,data__->TEMP,retain)
  __INIT_VAR(data__->TEMP0,0,retain)
  __INIT_VAR(data__->TEMPSET,0,retain)
  __INIT_VAR(data__->TEMPSET0,0,retain)
  TOF_init__(&data__->TOF0,retain);
  TP_init__(&data__->TP1,retain);
  CTU_init__(&data__->CTU0,retain);
  R_TRIG_init__(&data__->R_TRIG1,retain);
  R_TRIG_init__(&data__->R_TRIG2,retain);
  R_TRIG_init__(&data__->R_TRIG3,retain);
  F_TRIG_init__(&data__->F_TRIG1,retain);
  __INIT_VAR(data__->_TMP_GE28_OUT,__BOOL_LITERAL(FALSE),retain)
  __INIT_VAR(data__->_TMP_GT12_OUT,__BOOL_LITERAL(FALSE),retain)
  F_TRIG_init__(&data__->F_TRIG2,retain);
  __INIT_VAR(data__->_TMP_GT40_OUT,__BOOL_LITERAL(FALSE),retain)
  F_TRIG_init__(&data__->F_TRIG3,retain);
  F_TRIG_init__(&data__->F_TRIG4,retain);
  __INIT_VAR(data__->_TMP_LT58_OUT,__BOOL_LITERAL(FALSE),retain)
  F_TRIG_init__(&data__->F_TRIG5,retain);
  R_TRIG_init__(&data__->R_TRIG4,retain);
}

// Code part
void PROGRAM0_body__(PROGRAM0 *data__) {
  // Initialise TEMP variables

  __SET_VAR(data__->R_TRIG1.,CLK,,__GET_VAR(data__->START,));
  R_TRIG_body__(&data__->R_TRIG1);
  if (__GET_VAR(data__->R_TRIG1.Q,)) {
    __SET_VAR(data__->,INDICATOR,,__BOOL_LITERAL(TRUE));
  };
  __SET_EXTERNAL(data__->,VALVEAEXT,,__GET_VAR(data__->VALVEA,));
  __SET_VAR(data__->R_TRIG2.,CLK,,__GET_VAR(data__->STOP,));
  R_TRIG_body__(&data__->R_TRIG2);
  if (__GET_VAR(data__->R_TRIG2.Q,)) {
    __SET_VAR(data__->,INDICATOR,,__BOOL_LITERAL(FALSE));
  };
  __SET_VAR(data__->R_TRIG3.,CLK,,__GET_VAR(data__->START,));
  R_TRIG_body__(&data__->R_TRIG3);
  __SET_VAR(data__->TOF0.,IN,,__GET_VAR(data__->R_TRIG3.Q,));
  __SET_VAR(data__->TOF0.,PT,,__time_to_timespec(1, 0, 5, 0, 0, 0));
  TOF_body__(&data__->TOF0);
  __SET_VAR(data__->,VALVEA,,__GET_VAR(data__->TOF0.Q,));
  __SET_VAR(data__->F_TRIG1.,CLK,,__GET_VAR(data__->VALVEA,));
  F_TRIG_body__(&data__->F_TRIG1);
  if ((__GET_VAR(data__->INDICATOR,) && __GET_VAR(data__->F_TRIG1.Q,))) {
    __SET_VAR(data__->,VALVEB,,__BOOL_LITERAL(TRUE));
  };
  __SET_VAR(data__->,_TMP_GE28_OUT,,GE__BOOL__INT(
    (BOOL)__BOOL_LITERAL(TRUE),
    NULL,
    (UINT)2,
    (INT)__GET_EXTERNAL(data__->LEVEL,),
    (INT)80));
  if (__GET_VAR(data__->_TMP_GE28_OUT,)) {
    __SET_VAR(data__->,VALVEB,,__BOOL_LITERAL(FALSE));
  };
  __SET_VAR(data__->,_TMP_GT12_OUT,,GT__BOOL__INT(
    (BOOL)__BOOL_LITERAL(TRUE),
    NULL,
    (UINT)2,
    (INT)__GET_EXTERNAL(data__->LEVEL,),
    (INT)85));
  __SET_VAR(data__->,ALARM,,__GET_VAR(data__->_TMP_GT12_OUT,));
  __SET_EXTERNAL(data__->,VALVEBEXT,,__GET_VAR(data__->VALVEB,));
  __SET_VAR(data__->F_TRIG2.,CLK,,__GET_VAR(data__->VALVEB,));
  F_TRIG_body__(&data__->F_TRIG2);
  if ((__GET_VAR(data__->INDICATOR,) && __GET_VAR(data__->F_TRIG2.Q,))) {
    __SET_VAR(data__->,HEATER,,__BOOL_LITERAL(TRUE));
  };
  __SET_VAR(data__->,_TMP_GT40_OUT,,GT__BOOL__INT(
    (BOOL)__BOOL_LITERAL(TRUE),
    NULL,
    (UINT)2,
    (INT)__GET_EXTERNAL(data__->TEMP,),
    (INT)__GET_VAR(data__->TEMPSET,)));
  if (__GET_VAR(data__->_TMP_GT40_OUT,)) {
    __SET_VAR(data__->,HEATER,,__BOOL_LITERAL(FALSE));
  };
  __SET_EXTERNAL(data__->,HEATEREXT,,__GET_VAR(data__->HEATER,));
  __SET_VAR(data__->F_TRIG3.,CLK,,__GET_VAR(data__->VALVEB,));
  F_TRIG_body__(&data__->F_TRIG3);
  __SET_VAR(data__->TP1.,IN,,__GET_VAR(data__->F_TRIG3.Q,));
  __SET_VAR(data__->TP1.,PT,,__time_to_timespec(1, 0, 10, 0, 0, 0));
  TP_body__(&data__->TP1);
  __SET_VAR(data__->,MIXER,,__GET_VAR(data__->TP1.Q,));
  __SET_VAR(data__->F_TRIG4.,CLK,,__GET_VAR(data__->MIXER,));
  F_TRIG_body__(&data__->F_TRIG4);
  if ((__GET_VAR(data__->INDICATOR,) && __GET_VAR(data__->F_TRIG4.Q,))) {
    __SET_VAR(data__->,VALVEC,,__BOOL_LITERAL(TRUE));
  };
  __SET_VAR(data__->,_TMP_LT58_OUT,,LT__BOOL__INT(
    (BOOL)__BOOL_LITERAL(TRUE),
    NULL,
    (UINT)2,
    (INT)__GET_EXTERNAL(data__->LEVEL,),
    (INT)10));
  if (__GET_VAR(data__->_TMP_LT58_OUT,)) {
    __SET_VAR(data__->,VALVEC,,__BOOL_LITERAL(FALSE));
  };
  __SET_EXTERNAL(data__->,VALVECEXT,,__GET_VAR(data__->VALVEC,));
  __SET_VAR(data__->F_TRIG5.,CLK,,__GET_VAR(data__->VALVEC,));
  F_TRIG_body__(&data__->F_TRIG5);
  __SET_VAR(data__->R_TRIG4.,CLK,,__GET_VAR(data__->F_TRIG5.Q,));
  R_TRIG_body__(&data__->R_TRIG4);
  __SET_VAR(data__->CTU0.,CU,,__GET_VAR(data__->R_TRIG4.Q,));
  __SET_VAR(data__->CTU0.,R,,__GET_VAR(data__->STOP,));
  __SET_VAR(data__->CTU0.,PV,,999);
  CTU_body__(&data__->CTU0);
  if (__GET_VAR(data__->CTU0.Q,)) {
    __SET_VAR(data__->,INDICATOR,,__BOOL_LITERAL(FALSE));
  };
  __SET_VAR(data__->,LEVEL0,,__GET_EXTERNAL(data__->LEVEL,));
  __SET_VAR(data__->,TEMP0,,__GET_EXTERNAL(data__->TEMP,));
  __SET_VAR(data__->,TEMPSET0,,__GET_VAR(data__->TEMPSET,));

  goto __end;

__end:
  return;
} // PROGRAM0_body__() 





