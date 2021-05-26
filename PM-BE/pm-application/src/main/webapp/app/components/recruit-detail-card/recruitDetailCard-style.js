import { css } from '../../core/components/css-tag';

export const recruitDetailCardStyle = css`
#recruit__info{
    background-color: white;
    border-radius: 8px;
    padding: 10px;
}

#recruit__info__overview{
    display: flex;
}

#recruit__info__overview h3{
    margin: 10px 0 0 0;
}

#recruit__info__overview span{
    font-size: 15px;
}

#recruit__info__company__avatar{
    display: block;
    margin: 10px;
}

#recruit__info__web__feature{
    display: flex;
}

#recruit__info__web__feature div{
    background: linear-gradient(
        135deg
        , #1e4157f2 0%, #1597bb 100%);
    margin: 10px;
    border-radius: 20px;
    color: white;
    font-weight: bold;
    padding: 10px;
    cursor: pointer;
    min-width: 50px;
    flex: 0 0 auto;
}

#recruit__info__web__feature div i{
    display: inline-block;
}

#recruit__info__brief__info{
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: white;
    gap: 10px;
}

#recruit__info__brief__info div{
    background-color: white;
    padding: 10px;
    border: 0.1px solid  rgb(199, 199, 199);
    border-radius: 8px;
}

#recruit__info__brief__info h4{
    margin: 0;
    background-color: white;
}

#recruit__info__brief__info ul{
    margin: 0;
}

#recruit__info__detail__job__criteria{
    display: grid;
    grid-template-columns: 1fr 4fr;
    margin: 10px;
}

.recruit__info__detail__job__criteria__tag{
    font-weight: bold;
    font-size: 15px;
    margin: 8px;
}

.recruit__info__detail__job__criteria__detail{
    font-size: 15px;
    margin: 8px;
}

`;