                   dataTiketMulti.status == "R" ? null : (
                        {dataTiketMulti.status_approval != "Y" &&
                        dataTiketMulti.status_approval != "B" &&
                        dataTiketMulti.status_approval != "A" ? ("Need Approve"):("SRF Approved", @@1, @@2)})

                        "Need Approve"=
                        onPress={() =>
                              navigation.navigate(
                                "ScreenSignature",
                                dataTiketMulti
                              )
                            }

@@1= 
                            {(dataTiketMulti.status_approval == "B" &&
                              dataTiketMulti.before_chief != null) ||
                            dataTiketMulti.wolink_url != null ? (
                                  "Before WO"
                            ) : null}

@@2=
                            {dataTiketMulti.status_approval == "A" &&
                            dataTiketMulti.after_chief != null ? (
                                  "After WO"
                            ) : null}

===========================================

                    dataTiketMulti.status == "P" &&
                    dataTiketMulti.status_approval == "Y" &&
                    dataTiketMulti.before_chief != null ? ("Signature Before WO"):null
                    
                    onPress={() =>
                            buttonSignature(allDataforDetail, "before_wo")
                          }


===========================================

                    dataTiketMulti.status == "F" &&
                    dataTiketMulti.status_approval == "B" &&
                    dataTiketMulti.after_chief != null ? ("Signature After WO"):null

                    onPress={() =>
                            buttonSignatureAfter(allDataforDetail, "after_wo")
                          }



