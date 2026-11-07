import test from "node:test";
import assert from "node:assert/strict";
import { parseTpwdGrades } from "./tpwd-fishery-grades.mjs";

test("extracts only explicit agency grade markers",()=>{
 const html='<table><tr><th>Species</th><th>Poor</th><th>Fair</th><th>Good</th><th>Excellent</th></tr>'+
  '<tr><td>Largemouth Bass</td><td></td><td></td><td></td><td><img src="/assets/yes.gif" alt="yes"></td></tr>'+
  '<tr><td>Crappie</td><td></td><td></td><td><img alt="yes" src="/check.gif"></td><td></td></tr></table>';
 assert.deepEqual(parseTpwdGrades(html),[{name:"Largemouth Bass",grade:"excellent"},{name:"Crappie",grade:"good"}]);
});
test("rejects ambiguous or unrelated tables",()=>{
 const html='<table><tr><th>Species</th><th>Poor</th><th>Fair</th><th>Good</th><th>Excellent</th></tr>'+
  '<tr><td>Unscored</td><td></td><td></td><td></td><td></td></tr>'+
  '<tr><td>Ambiguous</td><td><img alt="yes"></td><td><img alt="yes"></td><td></td><td></td></tr></table>';
 assert.deepEqual(parseTpwdGrades(html),[]);
});
