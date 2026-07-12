#![allow(warnings)]
use std::fs;

use anyhow::Result;
use anyhow::anyhow;
use atrium_api::types::string::RecordKey;
// use atproto_client::client;
// use atproto_record::tid::Tid;
// use atproto_client::client::AppPasswordAuth;
// use reqwest::Client;
use security_framework::passwords::get_generic_password;
use serde_json::json;

use atrium_api::agent::atp_agent::{
  AtpAgent, store::MemorySessionStore,
};
use atrium_api::types::Unknown;
use atrium_api::types::string::Datetime;
use atrium_xrpc_client::reqwest::ReqwestClient;

#[tokio::main]
async fn main() -> Result<()> {
  create_record().await?;
  println!("Process complete");
  Ok(())
}

async fn create_record() -> Result<()> {
  let password = fs::read_to_string(
    "/Users/alan/Desktop/_DELTE_THIS_PASSWORD.txt",
  )?;
  // let password =
  //   get_password("atproto_alanwsmith_com_app_password")?;
  let agent = AtpAgent::new(
    ReqwestClient::new("https://bsky.social"),
    MemorySessionStore::default(),
  );

  agent.login("alanwsmith.com", password).await?;

  let did =
    agent.did().await.ok_or(anyhow!("no session did")).unwrap();
  let site_record = "at://did:plc:hehia4csii5iipebsgolxxal/site.standard.publication/3mp5l453r552a";

  let doc_record: Unknown = serde_json::from_str(&format!(
    r#"{{ "$type": "site.standard.document",
    "title": "AT Proto Stuff",
    "site": "{}",
    "publishedAt": "2026-07-06T15:51:00.000Z" }}"#,
    site_record
  ))?;

  let tid = "3mpytqlovtt5m".to_string();

  let output = agent
    .api
    .com
    .atproto
    .repo
    .create_record(
      atrium_api::com::atproto::repo::create_record::InputData {
        collection: "site.standard.document".parse().unwrap(),
        repo: did.into(),
        rkey: Some(RecordKey::new(tid).unwrap()),
        record: doc_record,
        swap_commit: None,
        validate: None,
      }
      .into(),
    )
    .await?;

  // let result = agent.api.com.atproto.server.get_session().await?;
  // println!("{:?}", result);

  // dbg!(password);
  // let app_auth = AppPasswordAuth {
  //   access_token: "asdf".to_string(),
  // };

  // let http_client = Client::new();
  // let site_record = "site.standard.publication/3mp5l453r552a";
  // let doc_record = json!({
  //   "$type": "site.standard.document",
  //   "site": site_record,
  //   "title": "AT Proto Stuff",
  //   "publishedAt": "2026-07-06T15:50:00.000Z",
  // });
  // let url = "https://porcini.us-east.host.bsky.network/xrpc/com.atproto.repo.getRecord?repo=did:plc:hehia4csii5iipebsgolxxal&collection=app.bsky.feed.post&rkey=3mpyjq7hqtc23";
  //let tid = Tid::new();
  //println!("{}", &tid);
  // let response = client::get_json(&http_client, url).await?;
  // dbg!(&response);
  Ok(())
}

fn get_password(key: &str) -> Result<String> {
  let account = "alan";
  let response = get_generic_password(key, account)?;
  Ok(String::from_utf8(response)?)
}
