//>>built
define("dojox/dtl/filter/strings","dojo/_base/lang dojo/_base/array dojox/string/tokenize dojox/string/sprintf ../filter/htmlstrings ../_base".split(" "),function(k,q,l,r,t,s){var g=k.getObject("filter.strings",!0,s);k.mixin(g,{_urlquote:function(a,b){b||(b="/");return l(a,/([^\w-_.])/g,function(a){if(-1==b.indexOf(a)){if(" "==a)return"+";for(a=a.charCodeAt(0).toString(16).toUpperCase();2>a.length;)a="0"+a;return"%"+a}return a}).join("")},addslashes:function(a){return a.replace(/\\/g,"\\\\").replace(/"/g,
'\\"').replace(/'/g,"\\'")},capfirst:function(a){a=""+a;return a.charAt(0).toUpperCase()+a.substring(1)},center:function(a,b){b=b||a.length;a+="";var d=b-a.length;d%2&&(a+=" ",d-=1);for(var c=0;c<d;c+=2)a=" "+a+" ";return a},cut:function(a,b){return(a+"").replace(RegExp(b+""||"","g"),"")},_fix_ampersands:/&(?!(\w+|#\d+);)/g,fix_ampersands:function(a){return a.replace(g._fix_ampersands,"\x26amp;")},floatformat:function(a,b){b=parseInt(b||-1,10);a=parseFloat(a);if(!(a-a.toFixed(0))&&0>b)return a.toFixed();
a=a.toFixed(Math.abs(b));return 0>b?parseFloat(a)+"":a},iriencode:function(a){return g._urlquote(a,"/#%[]\x3d:;$\x26()+,!")},linenumbers:function(a){var b=dojox.dtl.filter;a=a.split("\n");for(var d=[],c=(a.length+"").length,e=0,f;e<a.length;e++)f=a[e],d.push(b.strings.ljust(e+1,c)+". "+dojox.dtl._base.escape(f));return d.join("\n")},ljust:function(a,b){a+="";for(b=parseInt(b,10);a.length<b;)a+=" ";return a},lower:function(a){return(a+"").toLowerCase()},make_list:function(a){var b=[];"number"==typeof a&&
(a+="");if(a.charAt){for(var d=0;d<a.length;d++)b.push(a.charAt(d));return b}if("object"==typeof a){for(d in a)b.push(a[d]);return b}return[]},rjust:function(a,b){a+="";for(b=parseInt(b,10);a.length<b;)a=" "+a;return a},slugify:function(a){a=a.replace(/[^\w\s-]/g,"").toLowerCase();return a.replace(/[\-\s]+/g,"-")},_strings:{},stringformat:function(a,b){b=""+b;var d=g._strings;d[b]||(d[b]=new r.Formatter("%"+b));return d[b].format(a)},title:function(a){for(var b,d="",c=0,e;c<a.length;c++)e=a.charAt(c),
d=" "==b||"\n"==b||"\t"==b||!b?d+e.toUpperCase():d+e.toLowerCase(),b=e;return d},_truncatewords:/[ \n\r\t]/,truncatewords:function(a,b){b=parseInt(b,10);if(!b)return a;for(var d=0,c=a.length,e=0,f,h;d<a.length;d++){f=a.charAt(d);if(g._truncatewords.test(h)){if(!g._truncatewords.test(f)&&(++e,e==b))return a.substring(0,c+1)+" ..."}else g._truncatewords.test(f)||(c=d);h=f}return a},_truncate_words:/(&.*?;|<.*?>|(\w[\w\-]*))/g,_truncate_tag:/<(\/)?([^ ]+?)(?: (\/)| .*?)?>/,_truncate_singlets:{br:!0,
col:!0,link:!0,base:!0,img:!0,param:!0,area:!0,hr:!0,input:!0},truncatewords_html:function(a,b){b=parseInt(b,10);if(0>=b)return"";for(var d=0,c=[],e=l(a,g._truncate_words,function(a,e){if(e){++d;if(d<b)return e;if(d==b)return e+" ..."}var f=a.match(g._truncate_tag);if(f&&!(d>=b)){var h=f[1],f=f[2].toLowerCase();!h&&!g._truncate_singlets[f]&&(h?(h=q.indexOf(c,f),-1!=h&&(c=c.slice(h+1))):c.unshift(f));return a}}).join(""),e=e.replace(/\s+$/g,""),f=0,h;h=c[f];f++)e+="\x3c/"+h+"\x3e";return e},upper:function(a){return a.toUpperCase()},
urlencode:function(a){return g._urlquote(a)},_urlize:/^((?:[(>]|&lt;)*)(.*?)((?:[.,)>\n]|&gt;)*)$/,_urlize2:/^\S+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+$/,urlize:function(a){return g.urlizetrunc(a)},urlizetrunc:function(a,b){b=parseInt(b);return l(a,/(\S+)/g,function(a){var c=g._urlize.exec(a);if(!c)return a;var c=c[2],e=0==c.indexOf("www."),f=-1!=c.indexOf("@"),h=-1!=c.indexOf(":"),p=0==c.indexOf("http://"),k=0==c.indexOf("https://"),l=/[a-zA-Z0-9]/.test(c.charAt(0)),n=c.substring(c.length-4),m=c;3<b&&
(m=m.substring(0,b-3)+"...");return e||!f&&!p&&c.length&&l&&(".org"==n||".net"==n||".com"==n)?'\x3ca href\x3d"http://'+c+'" rel\x3d"nofollow"\x3e'+m+"\x3c/a\x3e":p||k?'\x3ca href\x3d"'+c+'" rel\x3d"nofollow"\x3e'+m+"\x3c/a\x3e":f&&!e&&!h&&g._urlize2.test(c)?'\x3ca href\x3d"mailto:'+c+'"\x3e'+c+"\x3c/a\x3e":a}).join("")},wordcount:function(a){a=k.trim(a);return!a?0:a.split(/\s+/g).length},wordwrap:function(a,b){b=parseInt(b);var d=[],c=a.split(/\s+/g);if(c.length){var e=c.shift();d.push(e);for(var f=
e.length-e.lastIndexOf("\n")-1,h=0;h<c.length;h++){var e=c[h],g=-1!=e.indexOf("\n")?e.split(/\n/g):[e],f=f+(g[0].length+1);b&&f>b?(d.push("\n"),f=g[g.length-1].length):(d.push(" "),1<g.length&&(f=g[g.length-1].length));d.push(e)}}return d.join("")}});return g});