this.mfModules=this.mfModules||{},this.mfModules["mobile.init"]=(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"./src/mobile.init/BetaOptinPanel.js":function(e,t,i){var o=i("./src/mobile.startup/Button.js"),n=i("./src/mobile.startup/util.js"),r=i("./src/mobile.startup/mfExtend.js"),a=i("./src/mobile.startup/Panel.js"),s=mw.user;function l(e){a.call(this,n.extend({className:"panel panel-inline visible",events:{"click .optin":"onOptin"}},e))}r(l,a,{templatePartials:n.extend({},a.prototype.templatePartials,{button:o.prototype.template}),template:mw.template.get("mobile.init","Panel.hogan"),defaults:n.extend({},a.prototype.defaults,{postUrl:void 0,editToken:s.tokens.get("editToken"),text:mw.msg("mobile-frontend-panel-betaoptin-msg"),buttons:[new o({progressive:!0,additionalClassNames:"optin",label:mw.msg("mobile-frontend-panel-ok")}).options,new o({additionalClassNames:"cancel",label:mw.msg("mobile-frontend-panel-cancel")}).options]}),onOptin:function(e){this.$el.find(e.currentTarget).closest("form").trigger("submit")}}),e.exports=l},"./src/mobile.init/ProgressBarWidget.js":function(e,t){e.exports=function(){this.$bar=$("<div>").addClass("mobile-progressBarWidget-bar"),this.$element=$("<div>").addClass("mobile-progressBarWidget").append(this.$bar)}},"./src/mobile.init/editor.js":function(e,t,i){var o=i("./src/mobile.startup/moduleLoaderSingleton.js"),n=i("./src/mobile.startup/util.js"),r=mw.loader.require("mediawiki.router"),a=i("./src/mobile.init/ProgressBarWidget.js"),s=i("./src/mobile.startup/Overlay.js"),l=i("./src/mobile.startup/OverlayManager.js").getSingleton(),d=i("./src/mobile.startup/rlModuleLoader.js"),c=$("#ca-edit a, a#ca-edit, .mw-editsection a, .edit-link"),m=mw.user,u=i("./src/mobile.startup/toast.js"),g=i("./src/mobile.startup/CtaDrawer.js"),w=/MSIE \d\./.test(navigator.userAgent),p=mw.config.get("wgPageContentModel"),b=r.isSupported()&&!w,f=mw.config.get("wgVisualEditorConfig"),v=mw.config.get("wgUserEditCount"),h=f,y=/^\/editor\/(\d+|all)$/;function P(){var e=new mw.Uri(this.href).query.section||"all";return r.navigate("#/editor/"+e),!1}function k(e,t){var i,u,g,w=0===e.options.id;c.on("click",P),l.add(y,function(i){var r,c,u,p,b,y=$("#mw-content-text"),P=function(){var e=mw.storage.get("preferredEditor");return e||(mw.config.get("wgMFUsePreferredEditor")&&"visualeditor"===mw.user.options.get("visualeditor-editor")?"VisualEditor":"SourceEditor")}(),k={overlayManager:l,api:new mw.Api,licenseMsg:t.getLicenseMsg(),title:e.title,titleObj:e.titleObj,isAnon:m.isAnon(),isNewPage:w,editCount:v,oldId:mw.util.getParamValue("oldid"),contentLang:y.attr("lang"),contentDir:y.attr("dir"),sessionId:m.generateRandomSessionId()},j=f&&f.namespaces||[],x=mw.util.getParamValue("redlink")?"new":"click";function E(){b.abort(),r.detach(),$("#content").css({transform:"","padding-bottom":"","margin-bottom":""}),$("#mw-mf-page-center").css({"padding-right":"","box-sizing":""}),$(document.body).removeClass("ve-loading")}function M(e){mw.track("mf.schemaEditAttemptStep",{action:"init",type:"section",mechanism:x,editor_interface:e,editing_session_id:k.sessionId})}function S(){return M("wikitext"),mw.hook("mobileFrontend.editorOpening").fire(),d.loadModule("mobile.editor.overlay").then(function(){return new(o.require("mobile.editor.overlay/EditorOverlay"))(k)})}return"all"!==i&&(k.sectionId=e.isWikiText()?+i:null),h&&e.isWikiText()&&-1!==j.indexOf(mw.config.get("wgNamespaceNumber"))&&"translation"!==mw.config.get("wgTranslatePageTranslation")&&("VisualEditor"===P||"VisualEditor"===g)&&"SourceEditor"!==g?(M("visualeditor"),mw.hook("mobileFrontend.editorOpening").fire(),function(){var e=new a;r=$("<div>").addClass("overlay-loading-ve").append(e.$element),$(document.body).append(r).addClass("ve-loading")}(),p=n.Deferred(),k.mode="visual",k.dataPromise=mw.loader.using("ext.visualEditor.targetLoader").then(function(){return b=mw.libs.ve.targetLoader.requestPageData(k.mode,k.titleObj.getPrefixedDb(),{sessionStore:!0,section:k.sectionId||null,oldId:k.oldId||void 0,targetName:"mobile"}),p.then(function(){return b})}),mw.loader.using("ext.visualEditor.targetLoader").then(function(){return mw.libs.ve.targetLoader.addPlugin("mobile.editor.ve"),mw.libs.ve.targetLoader.loadModules(k.mode)}).then(function(){var e,t=o.require("mobile.editor.overlay/VisualEditorOverlay"),i=o.require("mobile.editor.overlay/EditorOverlay");return k.EditorOverlay=i,(e=new t(k)).on("editor-loaded",E),e},function(){return S()}).then(function(e){var t=l.stack[0];t&&t.overlay===c&&(c.off("hide",E),e.on("hide",E),l.replaceCurrent(e))}),u=window.innerWidth-document.documentElement.clientWidth,(c=new s({className:"overlay overlay-loading",noHeader:!0})).on("hide",E),c.show=function(){var e,t,o,n;s.prototype.show.call(this),e=$("#mw-mf-page-center"),t=$("#content"),o="0"===i||"all"===i?$("#bodyContent"):$('[data-section="'+i+'"]').closest("h1, h2, h3, h4, h5, h6"),e.css({"padding-right":"+="+u,"box-sizing":"border-box"}),e.prop("scrollTop",this.scrollTop),n=o.prop("offsetTop")-this.scrollTop,n-=48,"0"!==i&&"all"!==i&&!0!==mw.config.get("wgVisualEditorConfig").enableVisualSectionEditing||(n-=16),t.css({transform:"translate( 0, "+-n+"px )","padding-bottom":"+="+n,"margin-bottom":"-="+n}),setTimeout(p.resolve,500)},c):S()}),$("#ca-edit a").prop("href",function(e,t){var i=new mw.Uri(t);return i.query.section=0,i.toString()}),r.getPath()||!mw.util.getParamValue("veaction")&&"edit"!==mw.util.getParamValue("action")||("edit"===mw.util.getParamValue("veaction")?g="VisualEditor":"editsource"===mw.util.getParamValue("veaction")&&(g="SourceEditor"),u="#/editor/"+(mw.util.getParamValue("section")||"edit"===mw.util.getParamValue("action")&&"all"||"0"),window.history&&history.pushState?(delete(i=mw.Uri()).query.action,delete i.query.veaction,delete i.query.section,history.replaceState(null,document.title,i.toString()+u)):r.navigate(u))}function j(e,t){var i,o;!(i=mw.config.get("wgMinervaReadOnly"))&&mw.config.get("wgIsProbablyEditable")?k(e,t):(function(e){e.$el.find(".mw-editsection").hide()}(e),o=mw.config.get("wgRestrictionEdit"),mw.user.isAnon()&&Array.isArray(o)&&-1!==o.indexOf("*")?function(){var e=new g({content:mw.msg("mobile-frontend-editor-disabled-anon"),signupQueryParams:{warning:"mobile-frontend-watchlist-signup-action"}});c.on("click",function(t){return e.show(),t.preventDefault(),e}),r.route(y,function(){e.show()}),r.checkRoute()}():x(i?mw.msg("apierror-readonly"):mw.msg("mobile-frontend-editor-disabled")))}function x(e){c.on("click",function(t){u.show(e),t.preventDefault()}),r.route(y,function(){u.show(e)}),r.checkRoute()}e.exports=function(e,t){var i=0===e.options.id;"wikitext"===p&&(mw.util.getParamValue("undo")||b&&(e.inNamespace("file")&&i?x(mw.msg("mobile-frontend-editor-uploadenable")):j(e,t)))}},"./src/mobile.init/mobile.init.js":function(e,t,i){var o,n,r=mw.storage,a=mw.config.get("skin"),s=mw.config.get("wgMFIsPageContentModelEditable"),l=i("./src/mobile.init/editor.js"),d=i("./src/mobile.startup/PageGateway.js"),c=i("./src/mobile.init/BetaOptinPanel.js"),m=new d(new mw.Api),u=mw.util,g=i("./src/mobile.startup/util.js"),w=g.getWindow(),p=g.getDocument(),b=mw.user,f=i("./src/mobile.startup/context.js"),v=i("./src/mobile.startup/Page.js"),h=mw.experiments,y=mw.config.get("wgMFExperiments")||{},P=i("./src/mobile.startup/Skin.js"),k=i("./src/mobile.startup/eventBusSingleton.js"),j=i("./src/mobile.startup/references/ReferencesMobileViewGateway.js"),x=M();function E(e,t){return function(){return[e.apply(this,arguments),t.apply(this,arguments)]}}function M(){return o||function(){var e=mw.config.get("wgRestrictionEdit",[]),t=$("#content #bodyContent"),i=mw.Title.newFromText(mw.config.get("wgRelevantPageName"));0===e.length&&e.push("*");return o=new v({el:t,title:i.getPrefixedText(),titleObj:i,protection:{edit:e},revId:mw.config.get("wgRevisionId"),isMainPage:mw.config.get("wgIsMainPage"),isWatched:$("#ca-watch").hasClass("watched"),sections:m.getSectionsFromHTML(t),isMissing:0===mw.config.get("wgArticleId"),id:mw.config.get("wgArticleId"),namespaceNumber:mw.config.get("wgNamespaceNumber")})}()}function S(){var e=r.get("userFontSize","regular");p.addClass("mf-font-size-"+e)}n=new P({el:"body",page:x,referencesGateway:j.getSingleton(),eventBus:k}),w.on("resize",E($.debounce(100,function(){k.emit("resize")}),$.throttle(200,function(){k.emit("resize:throttled")}))).on("scroll",E($.debounce(100,function(){k.emit("scroll")}),$.throttle(200,function(){k.emit("scroll:throttled")}))),w.on("pageshow",function(){S()}),S(),y.betaoptin&&function(e,t){var i,o,n,a=r.get("mobile-betaoptin-token");!1===a||"~"===a||t.isMainPage()||t.inNamespace("special")||(a||(a=b.generateRandomSessionId(),r.set("mobile-betaoptin-token",a)),o="stable"===f.getMode(),n="A"===h.getBucket(e,a),o&&(n||u.getParamValue("debug"))&&(i=new c({postUrl:u.getUrl("Special:MobileOptions",{returnto:t.title})})).on("hide",function(){r.set("mobile-betaoptin-token","~")}).appendTo(t.getLeadSectionElement()),mw.track("mobile.betaoptin",{isPanelShown:void 0!==i}))}(y.betaoptin,M()),window.console&&window.console.log&&window.console.log.apply&&mw.config.get("wgMFEnableJSConsoleRecruitment")&&console.log(mw.msg("mobile-frontend-console-recruit")),!x.inNamespace("special")&&s&&"minerva"===a&&null!==f.getMode()&&l(x,n),t={getCurrentPage:M},g.extend(mw.mobileFrontend,t),mw.log.deprecate(mw.mobileFrontend,"getCurrentPage",M),mw.mobileFrontend.deprecate("mobile.init/skin",n,"instance of mobile.startup/Skin. Minerva should have no dependencies on mobile.init"),e.exports=t}},[["./src/mobile.init/mobile.init.js",0,1]]]);
//# sourceMappingURL=mobile.init.js.map.json