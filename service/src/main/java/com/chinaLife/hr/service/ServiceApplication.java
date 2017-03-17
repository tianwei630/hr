package com.chinaLife.hr.service;

import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
import com.chinaLife.hr.service.beanPost.CacheBeanPost;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.List;

@SpringBootApplication
@EnableDiscoveryClient
@EnableCaching
@EnableScheduling
public class ServiceApplication extends WebMvcConfigurerAdapter {

	public static void main(String[] args) {
		SpringApplication.run(ServiceApplication.class, args);
	}


	@Bean
	public CacheBeanPost cacheBeanPost(){
		return new CacheBeanPost();
	}
	@Override
	public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
		super.configureMessageConverters(converters);
//		super.adddefault
		//先定义一个convert转换消息的对象
		FastJsonHttpMessageConverter fastConverter=new FastJsonHttpMessageConverter();
		//添加fastJson的配置信息，比如，是否需要格式化返回json数据
		FastJsonConfig fastJsonConfig=new FastJsonConfig();
//		fastJsonConfig.setSerializerFeatures(SerializerFeature.PrettyFormat);
//		fastjson将对象换换成json的时候，循环引用同一个对象会使用$ref，所以要禁用掉
		fastJsonConfig.setSerializerFeatures(SerializerFeature.DisableCircularReferenceDetect);
		//在convert中添加配置信息
		fastConverter.setFastJsonConfig(fastJsonConfig);
		//将convert添加到converters中
		converters.add(fastConverter);
	}
}
