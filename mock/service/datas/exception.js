/**
 * @author dondevi
 * @create 2018-02-05
 *
 * @update 2018-03-12 dondevi
 */

import { randomValue, randomInt } from "mock/modules/random.js";

const servers = [
  { name: "Server-1", ip: "192.168.112.101" },
  { name: "Server-2", ip: "192.168.112.102" },
  { name: "Server-3", ip: "192.168.112.103" },
];

const clients = [
  { userId: "13123456789", uuid: "f64f2940-fae4-11e7", device: "Android 7", clientIP: "192.168.0.1", clientVersion: "1.0.0" },
  { userId: "13223456789", uuid: "29e42f64-64e4-fae7", device: "iPhone 7", clientIP: "192.168.0.2", clientVersion: "1.0.1" },
  { userId: "13323456789", uuid: "ff40faaf-f61f-4111", device: "Android 8", clientIP: "192.168.0.3", clientVersion: "1.0.2" },
  { userId: "13423456789", uuid: "940f2940-11e4-e7e7", device: "Android 5", clientIP: "192.168.0.4", clientVersion: "1.0.3" },
];

const server = randomValue(0, 0, 2, -1, 1);
const client = randomValue(0, 0, 2, -1, 1);
const level = randomValue(2, 0, 3, -1, 1);

export const getException = (param, socket) => {
  socket._delay = 600000;
  return {
    // 检查时间
    "time": Date.now(),
    // 异常等级 { 0: "FATAL", 1: "ERROR", 2: "WARN", 3: "INFO" }
    "level": level.next(),
    // 异常消息
    "message": "public abstract boolean com.manage.service.account.IAdminManageService.updateAdminPassword(long,java.lang.String,java.lang.String)",
    // "args": "[0,\"12313123\",\"123123\"]",
    // 异常堆栈
    "stackTrace": "com.exception.XingfuException: Account_AdminAccountId_NotExist\n\tat com.manage.error.AccountServiceError.error(AccountServiceError.java:135)\n\tat com.manage.service.account.impl.AdminManageService.checkAdminAcount(AdminManageService.java:123)\n\tat com.manage.service.account.impl.AdminManageService.updateAdminPassword(AdminManageService.java:56)\n\tat sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\n\tat sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:57)\n\tat sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\n\tat java.lang.reflect.Method.invoke(Method.java:606)\n\tat org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:302)\n\tat org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:190)\n\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:157)\n\tat org.springframework.aop.aspectj.AspectJAfterThrowingAdvice.invoke(AspectJAfterThrowingAdvice.java:59)\n\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)\n\tat org.springframework.transaction.interceptor.TransactionInterceptor$1.proceedWithInvocation(TransactionInterceptor.java:99)\n\tat org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:281)\n\tat org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:96)\n\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)\n\tat org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:92)\n\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)\n\tat org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:208)\n\tat com.sun.proxy.$Proxy42.updateAdminPassword(Unknown Source)\n\tat com.manage.rest.maintain.account.AdminManageController.updateAdminPassword(AdminManageController.java:208)\n\tat sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\n\tat sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:57)\n\tat sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\n\tat java.lang.reflect.Method.invoke(Method.java:606)\n\tat org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:221)\n\tat org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:136)\n\tat org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:110)\n\tat org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:817)\n\tat org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:731)\n\tat org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:85)\n\tat org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:959)\n\tat org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:893)\n\tat org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:968)\n\tat org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:870)\n\tat javax.servlet.http.HttpServlet.service(HttpServlet.java:650)\n\tat org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:844)\n\tat javax.servlet.http.HttpServlet.service(HttpServlet.java:731)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:303)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:208)\n\tat org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:52)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:241)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:208)\n\tat org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:330)\n\tat org.springframework.security.web.access.intercept.FilterSecurityInterceptor.invoke(FilterSecurityInterceptor.java:118)\n\tat org.springframework.security.web.access.intercept.FilterSecurityInterceptor.doFilter(FilterSecurityInterceptor.java:84)\n\tat org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:342)\n\tat org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:113)\n\tat org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:342)\n\tat org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:103)\n\tat org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:342)\n\tat org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:113)\n\tat org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:342)\n\tat org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:154)\n\tat org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:342)\n\tat org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:45)\n\tat org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:342)\n\tat org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter.doFilter(AbstractAuthenticationProcessingFilter.java:199)\n\tat org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:342)\n\tat org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:110)\n\tat org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:342)\n\tat org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:50)\n\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)\n\tat org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:342)\n\tat org.springframework.security.web.context.SecurityContextPersistenceFilter.doFilter(SecurityContextPersistenceFilter.java:87)\n\tat org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:342)\n\tat org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:192)\n\tat org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:160)\n\tat org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:346)\n\tat org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:262)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:241)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:208)\n\tat org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:121)\n\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:241)\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:208)\n\tat org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:220)\n\tat org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:122)\n\tat org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:505)\n\tat org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:169)\n\tat org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:103)\n\tat org.apache.catalina.valves.AccessLogValve.invoke(AccessLogValve.java:956)\n\tat org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:116)\n\tat org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:436)\n\tat org.apache.coyote.http11.AbstractHttp11Processor.process(AbstractHttp11Processor.java:1078)\n\tat org.apache.coyote.AbstractProtocol$AbstractConnectionHandler.process(AbstractProtocol.java:625)\n\tat org.apache.tomcat.util.net.JIoEndpoint$SocketProcessor.run(JIoEndpoint.java:316)\n\tat java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1145)\n\tat java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)\n\tat org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61)\n\tat java.lang.Thread.run(Thread.java:745)\n",
    // 用户 ID
    "userId": clients[client.next()].userId,
    // 设备 UUID
    "uuid": clients[client.now()].uuid,
    // 设备型号
    "device": clients[client.now()].device,
    // 客户端 IP
    "clientIP": clients[client.now()].clientIP,
    // 客户端版本号
    "clientVersion": clients[client.now()].clientVersion,
    // 来源服务名称
    "sourceName": servers[server.next()].name,
    // 来源服务 IP
    "sourceIP": servers[server.now()].ip,
    // 是否需要告警
    "hasWarning": true,
    // 告警等级
    "warningLevel": 1,
  };
};
