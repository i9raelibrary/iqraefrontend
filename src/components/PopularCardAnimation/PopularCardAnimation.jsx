import React from 'react';
import { Button, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";
import './newnew.css';

const Card = ({ image, description, title, link }) => {
    return (
        <article className="card__article">
            <div className="card__img" >
                <img src={image} alt="article" />
            </div>

            <div className="card__data">
                <div className="justify-content-between d-flex">
                    <span className="card__description">{description} MAD</span>
                    <Typography color='primary' ># {link}</Typography>
                </div>
                <h2 className="card__title">{title}</h2>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                        marginTop: 1,
                        paddingY: 1,
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 'bold',
                    }}
                    >
                    Add to Cart
                </Button>
            </div>
        </article>
    );
};

const PopularCardAnimation = () => {
    const cards =[
        {
            image: 'https://img.freepik.com/free-photo/3d-rendering-retro-computer_23-2151004360.jpg?t=st=1734252769~exp=1734256369~hmac=fdde51cf1bbc8eb948eea5e7c4e0fd07904df138ef1d80462330155a2a439e02&w=1060',
            description: 200,
            title: 'The blue hp computer',
            link: 'PC',
        },
        {
            image: 'https://img.freepik.com/free-photo/blue-background-with-decorative-yellow-book_23-2147615013.jpg?t=st=1734219463~exp=1734223063~hmac=ec724a0f3839cf63c92dd8a911be748ebd25188c70185fec006aa4701d924cb8&w=360',
            description: 250,
            title: 'The blue Boock',
            link: 'Livres',
        },
        {
            image: 'https://img.freepik.com/free-photo/blue-geometric-shapes-background_23-2148319028.jpg?t=st=1734219426~exp=1734223026~hmac=1aa2d4eb9279b78fbe363c1b2a25bf4390b0aef2888c9536aaf253e8ec0597e7&w=360',
            description: 199,
            title: 'The blue Paprer',
            link: 'Paper',
        },
    ]

    const { t } = useTranslation();

    return (
    <div className="pupular_conatiner">
        <div className="textcont w-90">
            <p className="titreDeco" >{t("home.titre1")}</p>
        </div>
        <div className="cardsContainer">
        {cards.map((card, index) => (
            <Card 
                image={card.image}
                description={card.description}
                title={card.title}
                link={card.link}
            />
        ))}
        </div>
    </div>
    );
};

export default PopularCardAnimation;

// {cards.map((card, index) => (
//     <Card 
//         key={index}
//         image={card.image}
//         description={card.description}
//         title={card.title}
//         link={card.link}
//     />
// ))}