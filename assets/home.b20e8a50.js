import{a as s,k as n,Q as a,o as l}from"./index.6937268a.js";const p={class:"markdown-body"},o=a(`<h1>els-ui \u63D2\u4EF6\u5E93\u4F7F\u7528\u8BF4\u660E</h1><h2>\u5F15\u5165\u65B9\u5F0F</h2><p>\u5728 package.json \u6587\u4EF6\u4E2D\u7684\u4F9D\u8D56\u9879\u4E2D\u8FFD\u52A0</p><pre class="shiki" style="background-color:#1f1f1f;"><code class=""><span class="line"></span>
<span class="line"><span style="color:#B392F0;">  </span><span style="color:#FFAB70;">&quot;els-ui&quot;</span><span style="color:#B392F0;">: </span><span style="color:#FFAB70;">&quot;http://10.90.1.191:9099/xgit-ui/els-ui-dev.git&quot;</span><span style="color:#B392F0;">,</span></span>
<span class="line"></span></code></pre><p>\u7136\u540E\u4F7F\u7528 <code class="">npm install</code> \u6216\u8005 <code class="">yarn</code> \u6216\u8005 <code class="">pnpm install</code> \u6765\u5B89\u88C5\u4F9D\u8D56</p><h2>\u4F7F\u7528\u65B9\u5F0F</h2><h3>vue \u5168\u5C40\u5F15\u5165 (\u4E0D\u63A8\u8350)</h3><p>\u5728 main.js | main.ts \u6587\u4EF6\u4E2D</p><pre class="shiki" style="background-color:#1f1f1f;"><code class=""><span class="line"></span>
<span class="line"><span style="color:#B392F0;">  </span><span style="color:#F97583;">import</span><span style="color:#B392F0;"> elsUI </span><span style="color:#F97583;">from</span><span style="color:#B392F0;"> </span><span style="color:#FFAB70;">&quot;els-ui&quot;</span></span>
<span class="line"><span style="color:#B392F0;">  </span><span style="color:#6B737C;">//</span></span>
<span class="line"><span style="color:#B392F0;">  </span><span style="color:#79B8FF;">app</span><span style="color:#B392F0;">.use(elsUI)</span></span>
<span class="line"></span></code></pre><h3>\u5C40\u90E8\u5F15\u5165</h3><pre class="shiki" style="background-color:#1f1f1f;"><code class=""><span class="line"></span>
<span class="line"><span style="color:#B392F0;">  </span><span style="color:#F97583;">import</span><span style="color:#B392F0;"> {ElsForm} </span><span style="color:#F97583;">from</span><span style="color:#B392F0;"> </span><span style="color:#FFAB70;">&quot;els-ui&quot;</span></span>
<span class="line"></span></code></pre><h1>\u7EC4\u4EF6\u5E93\u6846\u67B6\u8BF4\u660E</h1><h2>\u547D\u4EE4\u8BF4\u660E</h2><h4>\u65B0\u5EFA\u7EC4\u4EF6</h4><pre class="shiki" style="background-color:#1f1f1f;"><code class=""><span class="line"><span style="color:#B392F0;">yarn run create</span></span>
<span class="line"></span></code></pre><hr><h4>\u4FEE\u6539\u7EC4\u4EF6\u7684\u540D\u79F0\u6216\u8005\u63CF\u8FF0\u7B49\u5185\u5BB9</h4><pre class="shiki" style="background-color:#1f1f1f;"><code class=""><span class="line"><span style="color:#B392F0;">yarn run change</span></span>
<span class="line"></span></code></pre><hr><h4>\u66F4\u65B0\u7EC4\u4EF6\u6A21\u677F\uFF08\u5F53\u7EC4\u4EF6\u6A21\u677F\u53D1\u751F\u53D8\u66F4\u540E\u53EF\u4EE5\u7528\u6B64\u547D\u4EE4\u7528\u65B0\u7684\u6A21\u677F\u751F\u6210\u7EC4\u4EF6\u5185\u5BB9\uFF09</h4><h4>\u4E0D\u8FC7\u4E00\u65E6\u7EC4\u4EF6\u8FDB\u5165\u4E86\u5F00\u53D1\uFF0C\u6DFB\u52A0\u4E86\u81EA\u5B9A\u4E49\u5185\u5BB9\uFF0C\u5C31\u4E0D\u8981\u4F7F\u7528\u8FD9\u4E2A\u547D\u4EE4\u4E86\uFF01\u8FD9\u4E2A\u547D\u4EE4\u4F1A\u8986\u76D6\u539F\u6765\u7684\u6240\u6709\u5185\u5BB9\uFF0C\u5E76\u6309\u7167\u73B0\u6709\u6A21\u677F\u91CD\u65B0\u751F\u6210\u5185\u5BB9\uFF01</h4><p><em>\u4E0D\u5305\u62EC\u8DEF\u7531\u6A21\u677F\u548C\u7EC4\u4EF6\u5165\u53E3\u6A21\u677F\u3002\u4EC5\u4EC5\u53EA\u7528\u4E8E\u7EC4\u4EF6\u7684\u76F8\u5173\u6A21\u677F\uFF01</em></p><pre class="shiki" style="background-color:#1f1f1f;"><code class=""><span class="line"><span style="color:#B392F0;">yarn run update</span></span>
<span class="line"></span></code></pre><hr><h4>\u5220\u9664\u7EC4\u4EF6</h4><pre class="shiki" style="background-color:#1f1f1f;"><code class=""><span class="line"><span style="color:#B392F0;">yarn run delete</span></span>
<span class="line"></span></code></pre><hr><h4>\u751F\u6210 Git \u63D0\u4EA4\u8BB0\u5F55\u6587\u6863</h4><pre class="shiki" style="background-color:#1f1f1f;"><code class=""><span class="line"><span style="color:#B392F0;">yarn run log</span></span>
<span class="line"></span></code></pre><hr><h4>\u751F\u6210\u63D2\u4EF6\u5E93 - \u5206\u6A21\u5757\u751F\u6210</h4><pre class="shiki" style="background-color:#1f1f1f;"><code class=""><span class="line"><span style="color:#B392F0;">yarn run build</span></span>
<span class="line"></span></code></pre><h4>\u751F\u6210\u63D2\u4EF6\u5E93 - \u5168\u91CF\u751F\u6210 \u5E76\u5BFC\u51FA\u5305\u4F53\u79EF\u5206\u6790\u9875\u9762</h4><pre class="shiki" style="background-color:#1f1f1f;"><code class=""><span class="line"><span style="color:#B392F0;">yarn run build:all</span></span>
<span class="line"></span></code></pre><hr><h4>\u751F\u6210\u6587\u6863\u9875\u9762</h4><pre class="shiki" style="background-color:#1f1f1f;"><code class=""><span class="line"><span style="color:#B392F0;">yarn run build:doc</span></span>
<span class="line"></span></code></pre><hr><h4>\u672C\u5730\u8FD0\u884C\u6587\u6863\u9875\u9762</h4><pre class="shiki" style="background-color:#1f1f1f;"><code class=""><span class="line"><span style="color:#B392F0;">yarn run dev</span></span>
<span class="line"></span></code></pre><hr><h2>\u914D\u7F6E\u8BF4\u660E</h2><h4>\u7EC4\u4EF6\u7684\u751F\u6210\u89C4\u5219\u548C\u6A21\u677F\u914D\u7F6E\u90FD\u5728 script \u76EE\u5F55\u4E0B</h4><pre class="shiki" style="background-color:#1f1f1f;"><code class=""><span class="line"><span style="color:#B392F0;">.</span></span>
<span class="line"><span style="color:#B392F0;">\u251C\u2500\u2500 script</span></span>
<span class="line"><span style="color:#B392F0;">\u251C\u2500\u2500\u2500\u2500 .template  </span><span style="color:#6B737C;"># \u521B\u5EFA\u7EC4\u4EF6\u65F6\u7684\u6A21\u677F\u96C6\u5408</span></span>
<span class="line"><span style="color:#B392F0;">\u251C\u2500\u2500\u2500\u2500 changeComp </span><span style="color:#6B737C;"># \u4FEE\u6539\u7EC4\u4EF6\u7684\u65B9\u6CD5\u96C6\u5408</span></span>
<span class="line"><span style="color:#B392F0;">\u251C\u2500\u2500\u2500\u2500 deleteComp </span><span style="color:#6B737C;"># \u5220\u9664\u7EC4\u4EF6\u7684\u65B9\u6CD5\u96C6\u5408</span></span>
<span class="line"><span style="color:#B392F0;">\u251C\u2500\u2500\u2500\u2500 genNewComp </span><span style="color:#6B737C;"># \u521B\u5EFA\u7EC4\u4EF6\u7684\u65B9\u6CD5\u96C6\u5408</span></span>
<span class="line"><span style="color:#B392F0;">\u251C\u2500\u2500\u2500\u2500 gitLog </span><span style="color:#6B737C;"># \u4F9D\u636E git \u63D0\u4EA4\u8BB0\u5F55\u751F\u6210\u66F4\u65B0\u6587\u6863\u7684\u65B9\u6CD5\u96C6\u5408</span></span>
<span class="line"><span style="color:#B392F0;">\u251C\u2500\u2500\u2500\u2500 config.js </span><span style="color:#6B737C;">#\u8DEF\u5F84\u548C\u53C2\u6570\u914D\u7F6E</span></span>
<span class="line"><span style="color:#B392F0;">\u251C\u2500\u2500\u2500\u2500 copyDir.js </span><span style="color:#6B737C;">#\u6253\u5305\u65F6\u590D\u5236\u6587\u4EF6\u7684\u5DE5\u5177\u65B9\u6CD5</span></span>
<span class="line"><span style="color:#B392F0;">\u251C\u2500\u2500 src </span><span style="color:#6B737C;"># \u6587\u6863\u9879\u76EE</span></span>
<span class="line"><span style="color:#B392F0;">\u251C\u2500\u2500\u2500\u2500 assets </span><span style="color:#6B737C;"># \u6587\u6863\u8D44\u6E90\u7C7B\u6587\u4EF6\u96C6\u5408</span></span>
<span class="line"><span style="color:#B392F0;">\u251C\u2500\u2500\u2500\u2500 components </span><span style="color:#6B737C;"># \u6587\u6863\u7EC4\u4EF6\u96C6\u5408</span></span>
<span class="line"><span style="color:#B392F0;">\u251C\u2500\u2500\u2500\u2500 config </span><span style="color:#6B737C;"># \u6587\u6863\u914D\u7F6E\u96C6\u5408</span></span>
<span class="line"><span style="color:#B392F0;">\u251C\u2500\u2500\u2500\u2500 docs </span><span style="color:#6B737C;"># \u9ED8\u8BA4\u6587\u6863\u96C6\u5408</span></span>
<span class="line"><span style="color:#B392F0;">\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500 gitLog.md </span><span style="color:#6B737C;"># git \u63D0\u4EA4\u8BB0\u5F55 MD \u6587\u6863</span></span>
<span class="line"><span style="color:#B392F0;">\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500 home.md </span><span style="color:#6B737C;"># \u9996\u9875 MD \u6587\u6863</span></span>
<span class="line"></span></code></pre><hr>`,45),e=[o],E={},i="",B=s({__name:"home",setup(c,{expose:u}){return u({frontmatter:{},excerpt:void 0}),(F,r)=>(l(),n("div",p,e))}});export{B as default,i as excerpt,E as frontmatter};
