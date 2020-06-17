# 基于最新版nginx创建
FROM nginx:latest
# 将nginx配置放到指定的位置
COPY mysite.template /etc/nginx/conf.d/mysite.template
# 打完包后在项目下的dist拷贝到指定位置
COPY dist/ /usr/share/nginx/html/
# 通过shell语句完成对nginx配置中变量的识别
ENTRYPOINT /bin/bash -c "envsubst < /etc/nginx/conf.d/mysite.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"
