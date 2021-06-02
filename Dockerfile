From h.cn/base/nginx:latest
RUN rm -rf /usr/share/nginx/html/*
COPY dist /usr/share/nginx/html/dist
RUN mv /usr/share/nginx/html/dist/* /usr/share/nginx/html && rmdir /usr/share/nginx/html/dist/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]