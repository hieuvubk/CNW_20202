import { css } from '../../../core/components/css-tag';

export const newsCardStyle =css`
.news-card{
    display: flex;
    flex-direction: column;
    margin: 10px;
    border: 1px solid rgb(201, 201, 201);
    border-radius: 8px;
    padding: 10px 10px 0px 10px;
    background-color: white;
}

.news-card>div{
    margin: 10px;
}

.recruit-info{
    background-color: white;
    border-radius: 8px;
}

.news-react{
    background-color: white;
    margin-bottom: 0 !important;
}

#poster-avatar{
    display: block;
    height: 60px;
    width: 60px;
}

.poster{
    display: flex;
}

.poster-info{
    margin-left: 10px;
}

.recruit-info > div{
    margin-bottom: 10px;
}

#recruit-image{
    display: block;
    width: 100%;
}

iframe{
    width: 100%;
    height: 300px;
}

.react{
    height: max-element;
    width: 100%;
    display: flex;
    border-top: 0.5px solid rgb(201, 201, 201);
    background-color: blue white;
}

.react>div{
    height: 40px;
    width: 60px;
    font-size: 25px;
    cursor: pointer;
    background-color: brown white;
    margin-left: 5px;
    position: relative;
    border-radius: 8px;
}

.react>div:hover{
    background-color: rgb(201, 201, 201);
}

.react-icon{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}

.like-post, .like-comment{
    color:#FF3A83 !important;
}
/*Comment======================================*/
.comment{
    background-color: whitesmoke;
    padding: 10px;
    margin-top: 0 !important;
    border-top: 0.5px solid rgb(201, 201, 201);
    display: none;
}

.display-comment{
    display: block;
}

.comment__card{
    background-color: white;
    display: flex;
    border-radius: 8px;
}

.comment__card__content{
    display: flex;
    flex-direction: column;
    margin-left: 10px;
}

.comment__card__avatar{
    padding: 5px;
}

#comment__card__avatar{
    height: 30px;
    width: 30px;
}

.comment__card__content__name a{
    font-weight: bold;
    color: blue;
    text-decoration: none;
}

.comment__card__content__detail {
    margin-left: 5px;
}

.comment__card__content__detail p{
    margin: 0;
}

.comment__card__content__react{
    display: flex;
}

.comment__card__content__react div{
    font-size:12px;
    margin-right: 10px;
    font-weight: bold;
    color: royalblue;
    cursor: pointer;
}
`;