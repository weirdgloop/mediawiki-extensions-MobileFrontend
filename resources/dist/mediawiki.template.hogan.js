this.mfModules=this.mfModules||{},this.mfModules["mediawiki.template.hogan"]=(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{22:function(t,n,r){var e=r(29);e.Template=r(30).Template,t.exports=e},29:function(t,n,r){!function(t){var n=/\S/,r=/\"/g,e=/\n/g,i=/\r/g,o=/\\/g,u={"#":1,"^":2,"/":3,"!":4,">":5,"<":6,"=":7,_v:8,"{":9,"&":10};function c(t){"}"===t.n.substr(t.n.length-1)&&(t.n=t.n.substring(0,t.n.length-1))}function s(t){return t.trim?t.trim():t.replace(/^\s*|\s*$/g,"")}function f(t,n,r){if(n.charAt(r)!=t.charAt(0))return!1;for(var e=1,i=t.length;e<i;e++)if(n.charAt(r+e)!=t.charAt(e))return!1;return!0}function h(t,n){for(var r=0,e=n.length;r<e;r++)if(n[r].o==t.n)return t.tag="#",!0}function l(t,n,r){for(var e=0,i=r.length;e<i;e++)if(r[e].c==t&&r[e].o==n)return!0}function a(t){return t.replace(o,"\\\\").replace(r,'\\"').replace(e,"\\n").replace(i,"\\r")}function p(t){return~t.indexOf(".")?"d":"f"}function g(t){for(var n="",r=0,e=t.length;r<e;r++){var i=t[r].tag;"#"==i?n+=v(t[r].nodes,t[r].n,p(t[r].n),t[r].i,t[r].end,t[r].otag+" "+t[r].ctag):"^"==i?n+=d(t[r].nodes,t[r].n,p(t[r].n)):"<"==i||">"==i?n+=m(t[r]):"{"==i||"&"==i?n+=b(t[r].n,p(t[r].n)):"\n"==i?n+=w('"\\n"'+(t.length-1==r?"":" + i")):"_v"==i?n+=_(t[r].n,p(t[r].n)):void 0===i&&(n+=w('"'+a(t[r])+'"'))}return n}function v(t,n,r,e,i,o){return"if(_.s(_."+r+'("'+a(n)+'",c,p,1),c,p,0,'+e+","+i+',"'+o+'")){_.rs(c,p,function(c,p,_){'+g(t)+"});c.pop();}"}function d(t,n,r){return"if(!_.s(_."+r+'("'+a(n)+'",c,p,1),c,p,1,0,0,"")){'+g(t)+"};"}function m(t){return'_.b(_.rp("'+a(t.n)+'",c,p,"'+(t.indent||"")+'"));'}function b(t,n){return"_.b(_.t(_."+n+'("'+a(t)+'",c,p,0)));'}function _(t,n){return"_.b(_.v(_."+n+'("'+a(t)+'",c,p,0)));'}function w(t){return"_.b("+t+");"}t.scan=function(t,r){var e=t.length,i=0,o=null,h=null,l="",a=[],p=!1,g=0,v=0,d="{{",m="}}";function b(){l.length>0&&(a.push(new String(l)),l="")}function _(t,r){if(b(),t&&function(){for(var t=!0,r=v;r<a.length;r++)if(!(t=a[r].tag&&u[a[r].tag]<u._v||!a[r].tag&&null===a[r].match(n)))return!1;return t}())for(var e,i=v;i<a.length;i++)a[i].tag||((e=a[i+1])&&">"==e.tag&&(e.indent=a[i].toString()),a.splice(i,1));else r||a.push({tag:"\n"});p=!1,v=a.length}function w(t,n){var r="="+m,e=t.indexOf(r,n),i=s(t.substring(t.indexOf("=",n)+1,e)).split(" ");return d=i[0],m=i[1],e+r.length-1}for(r&&(r=r.split(" "),d=r[0],m=r[1]),g=0;g<e;g++)0==i?f(d,t,g)?(--g,b(),i=1):"\n"==t.charAt(g)?_(p):l+=t.charAt(g):1==i?(g+=d.length-1,"="==(o=(h=u[t.charAt(g+1)])?t.charAt(g+1):"_v")?(g=w(t,g),i=0):(h&&g++,i=2),p=g):f(m,t,g)?(a.push({tag:o,n:s(l),otag:d,ctag:m,i:"/"==o?p-m.length:g+d.length}),l="",g+=m.length-1,i=0,"{"==o&&("}}"==m?g++:c(a[a.length-1]))):l+=t.charAt(g);return _(p,!0),a},t.generate=function(n,r,e){var i='var _=this;_.b(i=i||"");'+g(n)+"return _.fl();";return e.asString?"function(c,p,i){"+i+";}":new t.Template(new Function("c","p","i",i),r,t,e)},t.parse=function(t,n,r){return function t(n,r,e,i){for(var o=[],u=null,c=null;n.length>0;)if("#"==(c=n.shift()).tag||"^"==c.tag||h(c,i))e.push(c),c.nodes=t(n,c.tag,e,i),o.push(c);else{if("/"==c.tag){if(0===e.length)throw new Error("Closing tag without opener: /"+c.n);if(u=e.pop(),c.n!=u.n&&!l(c.n,u.n,i))throw new Error("Nesting error: "+u.n+" vs. "+c.n);return u.end=c.i,o}o.push(c)}if(e.length>0)throw new Error("missing closing tag: "+e.pop().n);return o}(t,0,[],(r=r||{}).sectionTags||[])},t.cache={},t.compile=function(t,n){var r=t+"||"+!!(n=n||{}).asString,e=this.cache[r];return e||(e=this.generate(this.parse(this.scan(t,n.delimiters),t,n),t,n),this.cache[r]=e)}}(n)},30:function(t,n,r){!function(t,n){t.Template=function(t,n,r,e){this.r=t||this.r,this.c=r,this.options=e,this.text=n||"",this.buf=""},t.Template.prototype={r:function(t,n,r){return""},v:function(t){return t=s(t),c.test(t)?t.replace(r,"&amp;").replace(e,"&lt;").replace(i,"&gt;").replace(o,"&#39;").replace(u,"&quot;"):t},t:s,render:function(t,n,r){return this.ri([t],n||{},r)},ri:function(t,n,r){return this.r(t,n,r)},rp:function(t,n,r,e){var i=r[t];return i?(this.c&&"string"==typeof i&&(i=this.c.compile(i,this.options)),i.ri(n,r,e)):""},rs:function(t,n,r){var e=t[t.length-1];if(f(e))for(var i=0;i<e.length;i++)t.push(e[i]),r(t,n,this),t.pop();else r(t,n,this)},s:function(t,n,r,e,i,o,u){var c;return(!f(t)||0!==t.length)&&("function"==typeof t&&(t=this.ls(t,n,r,e,i,o,u)),c=""===t||!!t,!e&&c&&n&&n.push("object"==typeof t?t:n[n.length-1]),c)},d:function(t,n,r,e){var i=t.split("."),o=this.f(i[0],n,r,e),u=null;if("."===t&&f(n[n.length-2]))return n[n.length-1];for(var c=1;c<i.length;c++)o&&"object"==typeof o&&i[c]in o?(u=o,o=o[i[c]]):o="";return!(e&&!o)&&(e||"function"!=typeof o||(n.push(u),o=this.lv(o,n,r),n.pop()),o)},f:function(t,n,r,e){for(var i=!1,o=null,u=!1,c=n.length-1;c>=0;c--)if((o=n[c])&&"object"==typeof o&&t in o){i=o[t],u=!0;break}return u?(e||"function"!=typeof i||(i=this.lv(i,n,r)),i):!e&&""},ho:function(t,n,r,e,i){var o=this.c,u=this.options;return u.delimiters=i,e=null==(e=t.call(n,e))?String(e):e.toString(),this.b(o.compile(e,u).render(n,r)),!1},b:function(t){this.buf+=t},fl:function(){var t=this.buf;return this.buf="",t},ls:function(t,n,r,e,i,o,u){var c,s=n[n.length-1];if(!e&&this.c&&t.length>0)return this.ho(t,s,r,this.text.substring(i,o),u);if("function"==typeof(c=t.call(s))){if(e)return!0;if(this.c)return this.ho(c,s,r,this.text.substring(i,o),u)}return c},lv:function(t,n,r){var e=n[n.length-1],i=t.call(e);return"function"==typeof i&&(i=s(i.call(e)),this.c&&~i.indexOf("{{"))?this.c.compile(i,this.options).render(e,r):s(i)}};var r=/&/g,e=/</g,i=/>/g,o=/\'/g,u=/\"/g,c=/[&<>\"\']/;function s(t){return String(null===t||void 0===t?"":t)}var f=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}}(n)},69:function(t,n,r){var e=r(22);mw.template.registerCompiler("hogan",{compile:e.compile.bind(e)})}},[[69,0]]]);
//# sourceMappingURL=mediawiki.template.hogan.js.map.json