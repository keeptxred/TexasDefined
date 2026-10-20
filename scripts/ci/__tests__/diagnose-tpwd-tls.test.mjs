import test from "node:test";
import assert from "node:assert/strict";
import { classifySourceResponse } from "../diagnose-tpwd-tls.mjs";

test("classifies real primary-source park alert HTML without trusting generic HTTP 200",()=>{
 assert.equal(classifySourceResponse(200,"<html><h1>Park Alerts</h1><p>"+("Park closure information.".repeat(10))+"</p></html>","text/html"),"verified_readable_http_content");
 assert.equal(classifySourceResponse(200,"<html><title>Client Challenge</title><div>"+("prove a browser".repeat(15))+"</div></html>","text/html"),"publisher_challenge");
 assert.equal(classifySourceResponse(200,"OK","text/html"),"inconclusive");
 assert.equal(classifySourceResponse(403,"Park Alerts".repeat(50),"text/html"),"http_error");
 assert.equal(classifySourceResponse(200,"Park Alerts".repeat(50),"application/pdf"),"inconclusive");
});
