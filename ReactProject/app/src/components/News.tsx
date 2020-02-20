import React from 'react';
import Media from 'react-bootstrap/Media';


let listFavoritesNews:number[];
listFavoritesNews = [];

// function loadNews(): void {
//   console.log('gg');
//   if (localStorage.favoritesNew !== null) {
//   // console.log('gg');
//   let items = JSON.parse(localStorage.favoritesNews)
//   console.log(items.length);
//   for(let i = 0; i<items.length; i++){
//     console.log(items[i])
//     // let id = items[i];
//     listFavoritesNews.push(items[i]);
//     let likes = document.querySelectorAll('.like');
//     console.log(likes.length)
//     likes.forEach((elem,index) =>{
//       console.log(index + 1)
//         console.log(items[i])
//       if(index + 1 === items[i]){
        
//         elem.className = 'like_red'
//       }
//     })
//   }
//   }

// }

  if (localStorage.favoritesNew !== null){
    let items = JSON.parse(localStorage.favoritesNews)
    for(let i = 0; i<items.length; i++){
      listFavoritesNews.push(items[i]);

    }
  }
  console.log(listFavoritesNews)

  function Like (id: number): boolean{
    console.log('eg')
    let res = listFavoritesNews.find((elem) => {
      return  elem === id
    })
    console.log(res)
    return (res) ? true : false
}

function loadNews(e: any, id: number): void {
  console.log('ddddddddd')
  const target = e.onLoad;
  console.log(id)
  if (Like(id)){
    target.className = 'like_red'
  }
}

function likeNews(e: any, id: number): void {
  const target = e.target;
  if (target.className === 'like_red') {
    target.className = 'like';
    deleteLikeNews(id)
  }
  else if (target.className === 'like') {
    target.className = 'like_red';
    addLikeNews(id)
  }
}

function deleteLikeNews(id:number):void{
  listFavoritesNews.splice(listFavoritesNews.indexOf(id), 1)
  localStorage.setItem('favoritesNews', JSON.stringify(listFavoritesNews));
}

function addLikeNews(id:number): void {
  listFavoritesNews.push(id);
  localStorage.setItem('favoritesNews', JSON.stringify(listFavoritesNews));
}

function News(props: any): object {

  let { item } = props;
  return (
    <Media className='content'>
      <Media.Body className='content__news'>
        <h5>{item.title}</h5>
        <p>{item.body}</p>
        <div>
          <div className='like' onLoad={(e) => loadNews(e, item.id)} onClick={(e) => likeNews(e, item.id)}></div>
        </div>
      </Media.Body>
    </Media>
  )
}

export default News