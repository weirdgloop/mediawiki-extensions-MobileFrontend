(self.webpackChunkmfModules=self.webpackChunkmfModules||[]).push([[243],{"./src/mobile.init/editor.js":(e,t,i)=>{var o=i("./src/mobile.startup/moduleLoaderSingleton.js"),n=i("./src/mobile.startup/util.js"),a=i("./src/mobile.init/editorLoadingOverlay.js"),r=i("./src/mobile.startup/OverlayManager.js"),s=$("#ca-edit, #ca-editsource, #ca-viewsource, #ca-ve-edit, #ca-ve-create, #ca-createsource"),l=s.length>1,c=null,d=".mw-editsection a, .edit-link",u=mw.user,m=i("./src/mobile.startup/CtaDrawer.js"),g=mw.config.get("wgVisualEditorConfig"),f=/^\/editor\/(\d+|T-\d+|all)$/;function p(e,t,i){var o;o=0===$(d).length?"all":mw.util.getParamValue("section",e.href)||"all",mw.config.get("wgPageName")===mw.util.getParamValue("title",e.href)&&(l&&("ca-ve-edit"===e.id||"ca-ve-create"===e.id?c="VisualEditor":"ca-editsource"!==e.id&&"ca-createsource"!==e.id||(c="SourceEditor")),i.navigate("#/editor/"+o),t.preventDefault())}function w(){if(c)return c;var e=mw.user.options.get("mobile-editor")||mw.storage.get("preferredEditor");if(e)return e;switch(mw.config.get("wgMFDefaultEditor")){case"source":return"SourceEditor";case"visual":return"VisualEditor";case"preference":return mw.user.options.get("visualeditor-hidebetawelcome")||mw.user.options.get("visualeditor-hideusered")?"visualeditor"===mw.user.options.get("visualeditor-editor")?"VisualEditor":"SourceEditor":"visual"===mw.config.get("wgMFFallbackEditor")?"VisualEditor":"SourceEditor"}return"SourceEditor"}function h(e,t){s.on("click",(function(t){mw.notify(e),t.preventDefault()})),mw.hook("wikipage.content").add((function(t){t.find(d).on("click",(function(t){mw.notify(e),t.preventDefault()}))})),t.route(f,(function(){mw.notify(e)})),t.checkRoute()}e.exports=function(e,t,i){var l=require("mediawiki.router");e.inNamespace("file")&&0===e.id?h(mw.msg("mobile-frontend-editor-uploadenable"),l):function(e,t,i,l){var b,v;if(!(b=mw.config.get("wgMinervaReadOnly"))&&mw.config.get("wgIsProbablyEditable"))!function(e,t,i,l){var m=r.getSingleton(),h=0===e.id;if(s.add(".edit-link").on("click.mfeditlink",(function(e){p(this,e,m.router)})),mw.hook("wikipage.content").add((function(e){e.find(d).off("click.mfeditlink").on("click.mfeditlink",(function(e){p(this,e,m.router)}))})),m.add(f,(function(r){var s,l,d,f,p=window.pageYOffset,b=$("#mw-content-text"),v=new URL(location.href),y={overlayManager:m,currentPageHTMLParser:i,fakeScroll:0,api:new mw.Api,licenseMsg:t.getLicenseMsg(),title:e.title,titleObj:e.titleObj,isAnon:u.isAnon(),isNewPage:h,oldId:mw.util.getParamValue("oldid"),contentLang:b.attr("lang"),contentDir:b.attr("dir"),preload:v.searchParams.get("preload"),preloadparams:mw.util.getArrayParam("preloadparams",v.searchParams),editintro:v.searchParams.get("editintro")},k=$.Deferred(),x=mw.util.getParamValue("redlink")?"new":"click";function E(e){mw.track("editAttemptStep",{action:"init",type:"section",mechanism:x,integration:"page",editor_interface:e})}function C(){var t=w();return e.isVESourceAvailable()||e.isVEVisualAvailable()&&"VisualEditor"===t}function S(){return E("wikitext"),mw.hook("mobileFrontend.editorOpening").fire(),mw.loader.using("mobile.editor.overlay").then((function(){return new(o.require("mobile.editor.overlay/SourceEditorOverlay"))(y)}))}return"all"!==r&&(y.sectionId=e.isWikiText()?r:void 0),s=n.Deferred(),d=a((function(){var e,t,i,o,n;$(document.body).addClass("ve-loading"),e=$("#mw-mf-page-center"),t=$("#content"),"0"===r||"all"===r?i=$("#bodyContent"):(i=$('a[href$="section='+r+'"],a[href*="section='+r+'&"]').closest(".mw-heading, h1, h2, h3, h4, h5, h6")).length||(i=$("#bodyContent")),e.prop("scrollTop",p),o=i[0].getBoundingClientRect().top,o-=48,C()?(n=!0===g.enableVisualSectionEditing||"mobile"===g.enableVisualSectionEditing,("0"===r||"all"===r||n)&&(o-=16)):"0"!==r&&"all"!==r||(o-=16),t.css({transform:"translate( 0, "+-o+"px )","padding-bottom":"+="+o,"margin-bottom":"-="+o}),y.fakeScroll=o,setTimeout(s.resolve,500)}),(function(){l&&l.abort&&l.abort(),$("#content").css({transform:"","padding-bottom":"","margin-bottom":""}),$(document.body).removeClass("ve-loading")}),C()?function(){x="tooslow",k.reject(),l&&l.abort&&l.abort()}:null),f=C()?function(){E("visualeditor"),mw.hook("mobileFrontend.editorOpening").fire(),y.mode=mw.config.get("wgMFEnableVEWikitextEditor")&&"SourceEditor"===w()?"source":"visual",y.dataPromise=mw.loader.using("ext.visualEditor.targetLoader").then((function(){return l=mw.libs.ve.targetLoader.requestPageData(y.mode,y.titleObj.getPrefixedDb(),{sessionStore:!0,section:void 0===y.sectionId?null:y.sectionId,oldId:y.oldId||void 0,preload:y.preload,preloadparams:y.preloadparams,editintro:y.editintro,targetName:"mobile"})}));var e=mw.loader.using("ext.visualEditor.targetLoader").then((function(){return mw.loader.using("mobile.editor.overlay").then((function(){return mw.libs.ve.targetLoader.addPlugin("ext.visualEditor.mobileArticleTarget"),mw.config.get("wgMFEnableVEWikitextEditor")&&mw.libs.ve.targetLoader.addPlugin("ext.visualEditor.mwwikitext"),mw.libs.ve.targetLoader.loadModules(y.mode)}))})),t=$.Deferred();return e.then(t.resolve,t.reject),k.then(t.reject,t.reject),t.then((function(){var e=o.require("mobile.editor.overlay/VisualEditorOverlay"),t=o.require("mobile.editor.overlay/SourceEditorOverlay");return y.SourceEditorOverlay=t,new e(y)}),(function(){return S()}))}():S(),n.Promise.all([f,s]).then((function(e){e.getLoadingPromise().catch((function(t){return"rejected"===k.state()?S().then((function(t){return(e=t).getLoadingPromise()})):$.Deferred().reject(t).promise()})).then((function(){var t=m.stack[0];t&&t.overlay===d&&m.replaceCurrent(e)}),(function(e,t){m.router.back(),e.show?(document.body.appendChild(e.$el[0]),e.show()):t?mw.notify(y.api.getErrorMessage(t)):mw.notify(mw.msg("mobile-frontend-editor-error-loading"))}))})),c=null,d})),$("#ca-edit a, a#ca-edit, #ca-editsource a, a#ca-editsource").prop("href",(function(e,t){var i=new URL(t,location.href);return i.searchParams.set("section","0"),i.toString()})),!l.getPath()&&(mw.util.getParamValue("veaction")||"edit"===mw.config.get("wgAction"))){"edit"===mw.util.getParamValue("veaction")?c="VisualEditor":"editsource"===mw.util.getParamValue("veaction")&&(c="SourceEditor");var b="#/editor/"+(mw.util.getParamValue("section")||("edit"===mw.config.get("wgAction")?"all":"0"));if(window.history&&history.pushState){var v=new URL(location.href);v.searchParams.delete("action"),v.searchParams.delete("veaction"),v.searchParams.delete("section"),history.replaceState(null,document.title,v)}n.docReady((function(){l.navigate(b)}))}}(e,i,t,l);else if(function(e){e.$el.find(".mw-editsection").hide()}(t),v=mw.config.get("wgRestrictionEdit"),mw.user.isAnon()&&Array.isArray(v)&&!v.length)!function(e){var t;function i(){t||(t=new m({content:mw.msg("mobile-frontend-editor-disabled-anon"),signupQueryParams:{warning:"mobile-frontend-watchlist-signup-action"}}),document.body.appendChild(t.$el[0])),t.show()}s.on("click",(function(e){i(),e.preventDefault()})),mw.hook("wikipage.content").add((function(e){e.find(d).on("click",(function(e){i(),e.preventDefault()}))})),e.route(f,(function(){i()})),e.checkRoute()}(l);else{var y=$("<a>").attr("href",mw.util.getUrl(mw.config.get("wgPageName"),{action:"edit"}));h(b?mw.msg("apierror-readonly"):mw.message("mobile-frontend-editor-disabled",y).parseDom(),l)}}(e,t,i,l)}},"./src/mobile.init/editorLoadingOverlay.js":(e,t,i)=>{var o=i("./src/mobile.init/fakeToolbar.js"),n=i("./src/mobile.startup/IconButton.js"),a=i("./src/mobile.startup/Overlay.js");e.exports=function(e,t,i){var r,s=o(),l=$("<div>").addClass("ve-loadbasiceditor"),c=new n({label:mw.msg("mobile-frontend-editor-loadbasiceditor"),action:"progressive",weight:"normal",size:"medium",isIconOnly:!1,icon:null}),d=new a({className:"overlay overlay-loading",noHeader:!0,isBorderBox:!1,onBeforeExit:function(e){e(),t(),r&&clearTimeout(r)}}),u=function(e,t){mw.track("visualEditorFeatureUse",{feature:e,action:t,editor_interface:"visualeditor"})};return d.show=function(){a.prototype.show.call(this),e()},d.$el.find(".overlay-content").append(s),i&&(d.$el.find(".overlay-content").append(l.append($("<p>").text(mw.msg("mobile-frontend-editor-loadingtooslow")),c.$el)),r=setTimeout((function(){l.addClass("ve-loadbasiceditor-shown"),u("mobileVisualFallback","context-show")}),3e3),c.$el.on("click",(function(){l.removeClass("ve-loadbasiceditor-shown"),u("mobileVisualFallback","fallback-confirm"),i()}))),s.addClass("toolbar-hidden"),setTimeout((function(){s.addClass("toolbar-shown"),setTimeout((function(){s.addClass("toolbar-shown-done")}),250)})),d}},"./src/mobile.init/lazyLoadedImages.js":(e,t,i)=>{var o=i("./src/mobile.startup/lazyImages/lazyImageLoader.js");function n(e){if(e[0]instanceof HTMLElement){var t=o.queryPlaceholders(e[0]);if(window.addEventListener("beforeprint",(function(){o.loadImages(t)})),mw.config.get("wgMFLazyLoadImages")){var i=new IntersectionObserver((function(e){e.forEach((function(e){var t=e.target;e.isIntersecting&&(o.loadImage(t),i.unobserve(t))}))}),{rootMargin:"0px 0px 50% 0px",threshold:0});t.forEach((function(e){i.observe(e)}))}}}mw.hook("mobileFrontend.loadLazyImages").add((function(e){var t=o.queryPlaceholders(e[0]);o.loadImages(t)})),e.exports=function(){mw.hook("wikipage.content").add(n)}},"./src/mobile.init/mobile.init.js":(e,t,i)=>{var o,n,a=i("./src/mobile.init/toggling.js"),r="mf-font-size",s="mf-expand-sections",l=mw.storage,c=new mw.Api,d=i("./src/mobile.init/lazyLoadedImages.js"),u=i("./src/mobile.init/editor.js"),m=i("./src/mobile.startup/currentPage.js")(),g=i("./src/mobile.startup/currentPageHTMLParser.js")(),f=i("./src/mobile.startup/util.js").getWindow(),p=i("./src/mobile.startup/Skin.js"),w=i("./src/mobile.startup/eventBusSingleton.js");function h(e,t){return function(){e.apply(this,arguments),t.apply(this,arguments)}}o=p.getSingleton(),f.on("resize",h(mw.util.debounce((function(){w.emit("resize")}),100),mw.util.throttle((function(){w.emit("resize:throttled")}),200))).on("scroll",h(mw.util.debounce((function(){w.emit("scroll")}),100),mw.util.throttle((function(){w.emit("scroll:throttled")}),200))),window.history&&history.pushState&&((n=new URL(window.location.href)).searchParams.has("venotify")||n.searchParams.has("mfnotify"))&&(n.searchParams.delete("venotify"),n.searchParams.delete("mfnotify"),window.history.replaceState(null,document.title,n.toString())),window.console&&window.console.log&&window.console.log.apply&&mw.config.get("wgMFEnableJSConsoleRecruitment")&&console.log(mw.msg("mobile-frontend-console-recruit")),mw.config.get("wgMFIsSupportedEditRequest")&&u(m,g,o),document.documentElement.classList.contains("mf-font-size-clientpref-xlarge")&&(mw.user.isAnon()?mw.user.clientPrefs.set(r,"large"):c.saveOption(r,"large")),mw.storage.get("expandSections")&&(mw.user.isAnon()?mw.user.clientPrefs.set(s,"1"):c.saveOption(s,"1"),l.remove("expandSections")),a(),d()},"./src/mobile.init/toggling.js":(e,t,i)=>{e.exports=function(){var e=i("./src/mobile.startup/currentPage.js")(),t=i("./src/mobile.startup/Toggler.js"),o=i("./src/mobile.startup/sectionCollapsing.js"),n=i("./src/mobile.startup/eventBusSingleton.js");e.inNamespace("special")||"view"!==mw.config.get("wgAction")&&"edit"!==mw.config.get("wgAction")||mw.hook("wikipage.content").add((function(i){var a=i.find(".mw-parser-output");0===a.length&&(a=i),function(e,i,a){document.querySelector(".mw-parser-output[data-mw-parsoid-version]")?o.init(e[0]):(e.find(".section-heading").removeAttr("onclick"),void 0!==window.mfTempOpenSection&&delete window.mfTempOpenSection,new t({$container:e,prefix:"content-",page:a,eventBus:n}))}(a,0,e)}))}},"./src/mobile.startup/Toggler.js":(e,t,i)=>{var o=i("./src/mobile.startup/Browser.js").getSingleton(),n=i("./src/mobile.startup/util.js"),a=n.escapeSelector,r={icon:"expand",isSmall:!0,additionalClassNames:"indicator"},s=i("./src/mobile.startup/Icon.js");function l(e){this.eventBus=e.eventBus,this.$container=e.$container,this.prefix=e.prefix,this.page=e.page,this._enable()}function c(e){var t=mw.storage.session.getObject("expandedSections")||{};return t[e.title]=t[e.title]||{},t}function d(e,t,i){var o,n,a=c(i);t.find(".section-heading span").each((function(){n=t.find(this),o=n.parents(".section-heading"),a[i.title][n.attr("id")]&&!o.hasClass("open-block")&&e.toggle(o,!0)}))}l.prototype.isCollapsedByDefault=function(){if(void 0===this._isCollapsedByDefault){var e=this.$container.closest(".collapsible-headings-collapsed, .collapsible-headings-expanded");e.length?this._isCollapsedByDefault=e.hasClass("collapsible-headings-collapsed"):this._isCollapsedByDefault=mw.config.get("wgMFCollapseSectionsByDefault")&&!o.isWideScreen()&&!document.documentElement.classList.contains("mf-expand-sections-clientpref-1")}return this._isCollapsedByDefault},l.prototype.toggle=function(e,t){if(!t&&e.hasClass("collapsible-heading-disabled"))return!1;var i=this,o=e.is(".open-block");e.toggleClass("open-block"),r.rotation=o?0:180;var n=new s(r),a=e.data("indicator");a&&(a.replaceWith(n.$el),e.data("indicator",n.$el)),e.find(".mw-headline").attr("aria-expanded",!o);var l=e.next();return l.hasClass("open-block")?(l.removeClass("open-block"),l.get(0).setAttribute("hidden","until-found")):(l.addClass("open-block"),l.removeAttr("hidden")),mw.requestIdleCallback((function(){i.eventBus.emit("section-toggled",{expanded:o,$heading:e}),mw.hook("mobileFrontend.section-toggled").fire({expanded:o,$heading:e})})),this.isCollapsedByDefault()&&function(e,t){var i=e.find(".mw-headline").attr("id"),o=c(t);i&&o[t.title]&&(e.hasClass("open-block")?o[t.title][i]=!0:delete o[t.title][i],function(e){mw.storage.session.setObject("expandedSections",e)}(o))}(e,this.page),!0},l.prototype.reveal=function(e){var t;try{t=this.$container.find("#"+a(e))}catch(e){}if(!t||!t.length)return!1;var i=t.parents(".collapsible-heading");return i.length||(i=t.parents(".collapsible-block").prev(".collapsible-heading")),i.length&&!i.hasClass("open-block")&&this.toggle(i),i.length&&window.scrollTo(0,t.offset().top),!0},l.prototype._enable=function(){var e,t,i=this;function o(){var e=window.location.hash;if(0===e.indexOf("#")&&(e=e.slice(1),!i.reveal(e))){var t=mw.util.percentDecodeFragment(e);t&&i.reveal(t)}}this.$container.children(".section-heading").each((function(e){var t=i.$container.find(this),o=t.find(".mw-headline"),n=t.find(".indicator"),a=i.prefix+"collapsible-block-"+e;if(t.next().is("section")){var l=t.next("section");t.addClass("collapsible-heading ").data("section-number",e).on("click",(function(e){var o=e.target.closest("a");o&&o.href||(e.preventDefault(),i.toggle(t))})),o.attr({tabindex:0,role:"button","aria-controls":a,"aria-expanded":"false"}),r.rotation=i.isCollapsedByDefault()?0:180;var c=new s(r);n.length?n.replaceWith(c.$el):c.prependTo(t),t.data("indicator",c.$el),l.addClass("collapsible-block").eq(0).attr({id:a}).on("beforematch",(function(){return i.toggle(t)})).addClass("collapsible-block-js").get(0).setAttribute("hidden","until-found"),function(e,t){t.on("keypress",(function(i){13!==i.which&&32!==i.which||e.toggle(t)})).find("a").on("keypress mouseup",(function(e){return e.stopPropagation()}))}(i,t),i.isCollapsedByDefault()||i.toggle(t)}})),(t=!!(e=mw.config.get("wgInternalRedirectTargetUrl"))&&e.split("#")[1])&&(window.location.hash=t),o(),n.getWindow().on("hashchange",(function(){return o()})),this.isCollapsedByDefault()&&this.page&&d(this,this.$container,this.page)},l._getExpandedSections=c,l._expandStoredSections=d,e.exports=l},"./src/mobile.startup/sectionCollapsing.js":e=>{e.exports={init:function(e){var t=Array.from(e.querySelectorAll(".mf-section-0 section .mw-heading")),i=6;t.forEach((function(e){var t=e.getAttribute("class").match(/mw-heading\d/i);if(t){var o=t[0].slice(-1);i=Math.min(o,i)}})),t.filter((function(e){return e.classList.contains("mw-heading".concat(i))})).forEach((function(e){var t=e.firstElementChild,i=e.nextElementSibling;e.classList.add("mf-collapsible-heading");var o=document.createElement("span");o.textContent=t.textContent,o.setAttribute("tabindex","0"),o.setAttribute("role","button"),o.setAttribute("aria-expanded","true"),o.setAttribute("aria-controls",i.id);var n=document.createElement("span");n.classList.add("mf-icon","mf-icon--small","mf-icon-collapse","indicator"),n.setAttribute("aria-hidden",!0),t.innerHTML="",t.append(n),t.append(o),t.addEventListener("click",(function(){return function(e,t,i){var o=e.hidden;e.hidden=!o&&"until-found",o?(t.setAttribute("aria-expanded","true"),i.classList.replace("mf-icon-expand","mf-icon-collapse")):(t.setAttribute("aria-expanded","false"),i.classList.replace("mf-icon-collapse","mf-icon-expand"))}(i,o,n)}))}))}}}},e=>{e.O(0,[569],(()=>("./src/mobile.init/mobile.init.js",e(e.s="./src/mobile.init/mobile.init.js"))));var t=e.O();(this.mfModules=this.mfModules||{})["mobile.init"]=t}]);
//# sourceMappingURL=mobile.init.js.map.json