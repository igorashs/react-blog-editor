(this["webpackJsonpreact-blog-editor"]=this["webpackJsonpreact-blog-editor"]||[]).push([[3],{40:function(e,t,a){},42:function(e,t,a){"use strict";a.r(t);var r=a(1),n=a.n(r),o=a(3),c=a(4),s=a(0),l=a.n(s),u=a(9),i=a(11);a(40),t.default=function(){var e=Object(s.useState)(null),t=Object(c.a)(e,2),a=t[0],r=t[1],m=Object(s.useState)(null),b=Object(c.a)(m,2),p=b[0],d=b[1],f=Object(s.useState)(""),j=Object(c.a)(f,2),E=j[0],O=j[1],w=Object(s.useState)(""),g=Object(c.a)(w,2),h=g[0],v=g[1],S=Object(s.useState)(""),k=Object(c.a)(S,2),y=k[0],x=k[1];function N(){return(N=Object(o.a)(n.a.mark((function e(t){var r,o,c;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),r=Object(i.d)(a),o=Object(i.a)(p),!r&&!o){e.next=8;break}O(r),v(o),e.next=12;break;case 8:return e.next=10,Object(u.g)({username:a,password:p});case 10:(c=e.sent).usernameError?O(" is invalid"):c.passwordError?v(" is invalid"):c.unknownError?x(c.error):(x(""),"string"===typeof c&&(localStorage.setItem("token",c),localStorage.setItem("sip","do not touch my token"),window.location.reload()));case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(s.useEffect)((function(){null!==a&&O(Object(i.d)(a))}),[a]),Object(s.useEffect)((function(){null!==p&&v(Object(i.a)(p))}),[p]),l.a.createElement("section",{className:"LoginFormSection"},l.a.createElement("h2",null,"Login"),l.a.createElement("form",{method:"Post",onSubmit:function(e){return N.apply(this,arguments)},className:(y||E||h)&&"FormError"},l.a.createElement("label",{htmlFor:"username",className:E&&"Error"},"Username ",E),l.a.createElement("input",{type:"text",id:"username",name:"username",onChange:function(e){r(e.currentTarget.value)}}),l.a.createElement("label",{htmlFor:"password",className:h&&"Error"},"Password ",h),l.a.createElement("input",{type:"password",name:"password",id:"password",onChange:function(e){d(e.currentTarget.value)}}),l.a.createElement("button",null,"Login"),y?l.a.createElement("label",{className:"Error"},y):""))}}}]);
//# sourceMappingURL=3.29221b43.chunk.js.map