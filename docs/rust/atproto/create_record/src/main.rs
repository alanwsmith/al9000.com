use anyhow::Result;
use atproto_client::client;
use atproto_record::tid::Tid;
use reqwest::Client;

#[tokio::main]
async fn main() -> Result<()> {
  create_record().await?;
  println!("Process complete");
  Ok(())
}

async fn create_record() -> Result<()> {
  let url = "https://porcini.us-east.host.bsky.network/xrpc/com.atproto.repo.getRecord?repo=did:plc:hehia4csii5iipebsgolxxal&collection=app.bsky.feed.post&rkey=3mpyjq7hqtc23";
  let http_client = Client::new();
  let tid = Tid::new();
  println!("{}", &tid);
  let response = client::get_json(&http_client, url).await?;
  dbg!(&response);
  Ok(())
}
