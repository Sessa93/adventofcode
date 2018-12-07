const fs = require('fs')

const input = fs.readFileSync('input.txt').toString()
const rs = input.trim().split('\n')
let m = {}
rs.forEach(r=>{
  r = r.split(' ')
  const a = r[1]
  const b = r[7]
  m[a] = m[a] || {n:a, b:{}}
  m[b] = m[b] || {n:b, b:{}}
  m[b].b[a] = true
})
let r = ''
while(true){
  const fs = Object.values(m)
    .filter(o=> !Object.keys(o.b).length)
    .sort((a,b)=> a.n < b.n ? -1 : 1)
  if(!fs[0]) break
  const n = fs[0].n
  r += n
  delete m[n]
  Object.values(m).forEach(o=>{
    delete o.b[n]
  })
}
console.log(r)

m = {}
rs.forEach(r=>{
  r = r.split(' ')
  const a = r[1]
  const b = r[7]
  m[a] = m[a] || {n:a, b:{}, d: 60 + a.charCodeAt(0) - 64}
  m[b] = m[b] || {n:b, b:{}, d: 60 + b.charCodeAt(0) - 64}
  m[b].b[a] = true
})
let t = 0
let ws = Array(5).fill('')
let d = ''
while(true){
  let fs = Object.values(m)
    .filter(o=> !Object.keys(o.b).length)
    .sort((a,b)=> a.n < b.n ? -1 : 1)
  if(!fs[0]) break
  fs = fs.filter(o=> !ws.includes(o.n))
  let i = -1
  ws = ws.map(w => w || (fs[++i]||{}).n || '')
  ws.forEach((w,i) => {
    if(!m[w]) return
    m[w].d -= 1
    if(!m[w].d){
      delete m[w]
      d += w
      ws[i] = ''
      Object.values(m).forEach(o=>{
        delete o.b[w]
      })
    }
  })
  t += 1
}
console.log(t)