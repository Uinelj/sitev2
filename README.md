# sitev2
testing a new approach

## Spec

### Architecture

```
  README.md
  posts/--
         |--1-title.md
         |--2-title.md
  pages/--
         |--1-title.md
         |--2-title.md
  index.html
```

The numbers are here to order posts and pages. Title will be used to make the links for now, but maybe we'll move on to some yaml info in the posts themselves if it's memory and network efficient (going through raw.github.com)

## Example requests

* Get README url : `curl  -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET https://api.github.com/repos/uinelj/sitev2/readme`
* Get posts : `curl  -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET https://api.github.com/repos/uinelj/sitev2/contents/posts`

## Things to consider

* [Content type for markdown](https://developer.github.com/v3/repos/contents/#custom-media-types)
* Use base64 to save requests
