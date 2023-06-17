const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo:'B', url: 'https://bilibili.com'},
    {logo:'C', url: 'https://css-tricks.com'},
    {logo:'D', url: 'https://dribbble.com'},
    {logo:'G', url: 'https://github.com'},
    {logo:'W', url: 'https://wangdoc.com/es6'},
    {logo:'Z', url: 'https://www.zhihu.com'},
]

const simplifyUrl=(url)=>{
    return url.replace('https://', '')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/,'') // 删除/开头内容
}

const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
        const $li = $(`<li>
        
          <div class="site">
            <div class="logo">
              ${node.logo} 
            </div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
            <svg class="icon">
                <use xlink:href="#icon-close"></use>
              </svg>
            </div>
          </div>
        
      </li>` 
        ).insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close', (e)=>{
            e.stopPropagation()
            hashMap.splice(index,1)
            render()
        })
    })
}

render()

$('.addButton')
    .on('click',()=>{
        let url = window.prompt('请输入您要添加的网址：')
        if(url.indexOf('http') !== 0){
            url = 'https://'+ url
        }
        console.log(url)
        hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(),
            url: url})    
           render()
})

window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap) // 对象变为字符串
    window.localStorage.setItem('x', string)
}



let inputting = false
let inputBar = document.getElementById('inputBar')
let searchButton = document.getElementById('searchButton')
inputBar.addEventListener('focus',(e) =>{
    inputting = true
    e.target.placeholder = '在Baidu中搜索，或输入网址'
})
inputBar.addEventListener('focusout', function (e) {
    inputting = false;
    e.target.placeholder = ''
})




$(document).on('keypress', (e)=>{
    // key = e.key
    const {key} = e

    for(let i=0;i<hashMap.length;i++){
        if(!inputting){
            if(hashMap[i].logo.toLowerCase() === key  ){
                window.open(hashMap[i].url)
            }
        }

    }
  // 此功能需解决输入框中按下英文b不应跳转问题,暂不使用
})





