const _0xec60=['Are\x20you\x20sure\x20you\x20want\x20to\x20delete\x20user\x20=\x20','#addName','item','Insert\x20all\x20feilds\x20correctly','SELECT\x20*\x20FROM\x20Users','length','Pharma\x20DataBase','innerHTML','1MdKQlm','executeSql','location','89eCIciQ','transaction','delete\x20from\x20Users\x20where\x20username\x20=\x20?','select\x20*\x20from\x20Users','#addPassword','303GNcNTw','usersTable','validation','2fjtazU','557959pwSOzz','481994sVVjom','</tr>','306406GmFeKm','961384kaoCPt','<tr>','insert\x20into\x20Users\x20values\x20(?,\x20?)','val','63osLsyB','pharmaDB','rows','16709LAuXOZ','#addPassword2','login.html','clear','1.0','getElementById','155723UjNBTW','admin','reload','1YKCXGh','you\x20are\x20not\x20the\x20admin!','replace','insert\x20into\x20Users\x20values\x20(\x22admin\x22,?)','CREATE\x20TABLE\x20IF\x20NOT\x20EXISTS\x20Users\x20(username\x20unique,\x20password)'];const _0x4def=function(_0x2d436a,_0x4b7f88){_0x2d436a=_0x2d436a-0x1b2;let _0xec6078=_0xec60[_0x2d436a];return _0xec6078;};const _0x347f66=_0x4def;(function(_0x38b562,_0x56d3d7){const _0x202bb7=_0x4def;while(!![]){try{const _0x10b654=-parseInt(_0x202bb7(0x1cd))*-parseInt(_0x202bb7(0x1cc))+parseInt(_0x202bb7(0x1d1))+parseInt(_0x202bb7(0x1c9))*-parseInt(_0x202bb7(0x1d5))+-parseInt(_0x202bb7(0x1d0))*parseInt(_0x202bb7(0x1b4))+parseInt(_0x202bb7(0x1ce))+parseInt(_0x202bb7(0x1c1))*-parseInt(_0x202bb7(0x1de))+-parseInt(_0x202bb7(0x1d8))*parseInt(_0x202bb7(0x1c4));if(_0x10b654===_0x56d3d7)break;else _0x38b562['push'](_0x38b562['shift']());}catch(_0x4dd15c){_0x38b562['push'](_0x38b562['shift']());}}}(_0xec60,0x90481));if(sessionStorage[_0x347f66(0x1cb)]==_0x347f66(0x1b2)){let db=openDatabase(_0x347f66(0x1d6),_0x347f66(0x1dc),_0x347f66(0x1bf),0x32*0x400*0x400),adminPwd=md5(_0x347f66(0x1b2));db['transaction'](function(_0x3e6a11){const _0x4a8377=_0x347f66;_0x3e6a11[_0x4a8377(0x1c2)](_0x4a8377(0x1b8)),_0x3e6a11['executeSql'](_0x4a8377(0x1c7),[],function(_0x155731,_0x16a6aa){const _0x34517b=_0x4a8377;_0x16a6aa['rows'][_0x34517b(0x1be)]==0x0&&_0x155731[_0x34517b(0x1c2)](_0x34517b(0x1b7),[adminPwd]);});});function addUser(){const _0x2780ee=_0x347f66;let _0x24ef17=$(_0x2780ee(0x1ba))[_0x2780ee(0x1d4)](),_0x2afe57=md5($(_0x2780ee(0x1c8))['val']()),_0x34f131=md5($(_0x2780ee(0x1d9))[_0x2780ee(0x1d4)]());console['log'](_0x34f131),_0x24ef17&&_0x2afe57==_0x34f131?(db['transaction'](function(_0x34ef20){const _0x19091d=_0x2780ee;_0x34ef20[_0x19091d(0x1c2)](_0x19091d(0x1d3),[_0x24ef17,_0x2afe57]);}),setTimeout(function(){const _0xb6ba96=_0x2780ee;window[_0xb6ba96(0x1c3)][_0xb6ba96(0x1b3)]();},0x1f4)):alert(_0x2780ee(0x1bc));}db[_0x347f66(0x1c5)](function(_0x5b3d52){const _0x264ca5=_0x347f66;_0x5b3d52[_0x264ca5(0x1c2)](_0x264ca5(0x1bd),[],function(_0x2b47db,_0x539a27){const _0x3dea94=_0x264ca5;var _0x237038='';for(var _0x232371=0x0;_0x232371<_0x539a27[_0x3dea94(0x1d7)][_0x3dea94(0x1be)];_0x232371++){_0x237038+=_0x3dea94(0x1d2);for(var _0x1827c4 in _0x539a27['rows'][_0x3dea94(0x1bb)](_0x232371)){_0x237038+='<td>'+_0x539a27[_0x3dea94(0x1d7)][_0x3dea94(0x1bb)](_0x232371)[_0x1827c4]+'</td>';}_0x237038+=_0x3dea94(0x1cf);}document[_0x3dea94(0x1dd)](_0x3dea94(0x1ca))[_0x3dea94(0x1c0)]=_0x237038;},null);});function removeUser(){const _0x2a107a=_0x347f66;let _0x590526=$(_0x2a107a(0x1ba))[_0x2a107a(0x1d4)]();confirm(_0x2a107a(0x1b9)+_0x590526),db[_0x2a107a(0x1c5)](function(_0x2800bd){const _0x34637b=_0x2a107a;_0x2800bd[_0x34637b(0x1c2)](_0x34637b(0x1c6),[_0x590526]),setTimeout(function(){const _0x4e16b0=_0x34637b;window[_0x4e16b0(0x1c3)][_0x4e16b0(0x1b3)]();},0x1f4);});}function logOut(){const _0x5374c7=_0x347f66;sessionStorage[_0x5374c7(0x1db)]();}}else window[_0x347f66(0x1c3)][_0x347f66(0x1b6)](_0x347f66(0x1da)),alert(_0x347f66(0x1b5));