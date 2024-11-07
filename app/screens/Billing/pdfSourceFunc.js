const pdfSourceFunc = (channel) => {
  const pdfSource = {
    uri: "",
    //uri: "https://drive.google.com/file/d/1FZalOrcH_rD2ud0rqKlujtR1_GzZ_FeQ/view?usp=sharing"
    //uri: "https://drive.google.com/uc?export=download&id=1FZalOrcH_rD2ud0rqKlujtR1_GzZ_FeQ",
    cache: true,
  };

  const merchant = {
    permata:
      "https://drive.google.com/uc?export=download&id=1YjEYQh8ibmVyYzAb1DHgfBS-1ncZFw0g",
    danamon:
      "https://drive.google.com/uc?export=download&id=1KwetUbAgS5LBhAS-9j2XYubWE8i_5icn",
    mandiri:
      "https://drive.google.com/uc?export=download&id=1_QdtrDB05BblXQzkNkZnqLVc1l_Wcn42",
    maybank:
      "https://drive.google.com/uc?export=download&id=1FYarm1tOD4j06X_DeEOhVvta_Xf5Rodp",
    bca: "https://drive.google.com/uc?export=download&id=1WAnERWsaGGDLHf3Ipb8LJr77zopzN210",
    bni: "https://drive.google.com/uc?export=download&id=1sPXmwoaZiW4j47WTRSPnWfFeY16B6g0z",
    sinarmas:
      "https://drive.google.com/uc?export=download&id=1UIJL7N3t0NW--imLAzq_MJNy0fv13ykb",
    bnc: "https://drive.google.com/uc?export=download&id=1mczFG7UPpMowH0sRB6bM5biNEpmjKq5k",
    btn: "https://drive.google.com/uc?export=download&id=106EZEk3Br_rPeWczAIujAHQpGjKRfUD7",
    cs1_indomaret:
      "https://drive.google.com/uc?export=download&id=1yGfxkPJLmyX2YAvxvysiQdfWCphOTbbN",
    cs2_alfamart:
      "https://drive.google.com/uc?export=download&id=1ofqbli3hqVIhZXTjWsgACIstAT3gZHVk",
  };

  switch (channel) {
    case "PERMATA":
      pdfSource.uri = merchant.permata;
      break;
    case "DANAMON":
      pdfSource.uri = merchant.danamon;
      break;
    case "MANDIRI":
      pdfSource.uri = merchant.mandiri;
      break;
    case "MAYBANK":
      pdfSource.uri = merchant.maybank;
      break;
    case "BCA":
      pdfSource.uri = merchant.bca;
      break;
    case "BNI":
      pdfSource.uri = merchant.bni;
      break;
    case "SINARMAS":
      pdfSource.uri = merchant.sinarmas;
      break;
    case "BNC":
      pdfSource.uri = merchant.bnc;
      break;
    case "BTN":
      pdfSource.uri = merchant.btn;
      break;
    case "INDOMARET":
      pdfSource.uri = merchant.cs1_indomaret;
      break;
    case "ALFAMART":
      pdfSource.uri = merchant.cs2_alfamart;
      break;
    default:
      pdfSource.uri = "";
    // "https://drive.google.com/uc?export=download&id=1FZalOrcH_rD2ud0rqKlujtR1_GzZ_FeQ";
  }
  return pdfSource;
};

export { pdfSourceFunc };
