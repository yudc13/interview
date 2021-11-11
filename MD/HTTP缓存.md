### `1、强缓存`

- Expires

  > 设置资源的过期时间，如果请求的资源在这个时间内，则命中缓存

- Cache-Control

  > 1. public
  > 2. private
  > 3. no-cache
  > 4. no-store
  > 5. max-age（单位是秒，设置为0，则不使用缓存）
  > 6. must-revalidate
  > 7. proxy-revalidate

- Expires和Cache-Control区别

  > 1. Expires是HTTP1.0；Cache-Control是HTTP1.1
  > 2. Expires是一个具体的时间，如果客户端和服务端时间相差很大，会导致缓存失效，不准确；而Cache-Control是时间段，比较好控制

### `2、协商缓存`

- Last-Modified - If-Modify-Since

  > `Last-Modified`是该资源最后一次更改的时间
  >
  > 在下一次浏览器发送请求时，会带上`If-Modify-Since`，服务端会将这个值和`Last-Modified`进行比较，如果相同则命中缓存

- ETag - If-None-Match

  > ETag作为资源的唯一标识，只要资源发生变化，Etag值就会重新生成；
  >
  > 在下一次浏览器发送请求的时候，会在请求头带上`If-None-Match`，服务端收到这个值后会和`Etag`值进行比较，如果相同，则说明资源没有发生变化，命中缓存

- Last-Modified和ETag区别

  > 1. **在方式上**：`Etag`是资源的唯一标识，`Last-Modify`是该资源最后一次更改时间
  > 2. **在精确度上**：`Etag`要优先于`Last-Modified`，Last-Modified的时间单位是`秒`
  > 3. **在性能上**：`Last-Modified`要好于`Etag`,Eag需要通过算法计算出资源的hash值
  > 4. **在优先级上**：`Etag`要高于`Last-Modified`

