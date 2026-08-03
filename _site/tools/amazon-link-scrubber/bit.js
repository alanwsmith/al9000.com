export const b = {};

export function fixLink(_, __, el) {
  el.value = "";
  b.forwardSender(el, "updateAmazonLinkScrubber");
}

export function copyAmazonLinkScrubber(_, sender, el) {
  b.copy(el, sender);
}

export function showAmazonLinkScrubberExample(_, __, el) {
  el.value =
    `https://www.amazon.com/AstroAI-Microfiber-Windshield-Telescopic-Extendable/dp/B08C7K99WW/ref=sr_1_2_sspa?crid=199PCC1Z2KBRV&dib=eyJ2IjoiMSJ9.Z1dVm72d6E9dORM7TqvA5tzxXysS0zU1kzy6LR039goKaXKyMwMdLSTkuONse5kjmE5VmizpSJn4GOrfZdJ4tefrQMyA450Id_CwqQ68GmxF5fvqYXJhcQOCfmdcCsyoS0VtDrdHuUxAn6KK878pTfJhSQtzh1BzSdic1WRozJQZI79ma9HTAWBlApK0lYaRQEUhGXF-uUs1LjLvgUM6R4eIU-phLWWgXw_5F3iBTfxTiPFjsapLZmP6xguQq7m8V0RknszLfUS5DzsAemjgRc0pCyRumiS9w3d4un3kALk.4BcPX0o6Ner1B-yOy-6HQniXP_5aqTyXA2ylZdZsVPc&dib_tag=se&keywords=arm%2Band%2Bhammer%2Bcar%2Bwindshield%2Bcleaner&qid=1784981248&sprefix=arm%2Band%2Bhammer%2Bcar%2Bwindshield%2Bcleaner%2Caps%2C141&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1`
      .trim();
  b.forwardSender(el, "updateAmazonLinkScrubber");
}

export function updateAmazonLinkScrubber(_, sender, el) {
  const matches = sender.value.match(/(dp\/.*?)\//);
  if (matches !== null) {
    el.value = `https://www.amazon.com/${matches[1]}`;
  } else {
    el.value = "Could not find ID";
  }
}