import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./styles.css";
import { useRecipes } from "../../modules/recipes/RecipesProvider";
import { Link } from "react-router-dom";


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 8,
        slidesToSlide: 2 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 5,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 767, min: 464 },
        items: 2,
        slidesToSlide: 1 // optional, default to 1.
    }
};

export const Swiper = () => {

    const recipes = useRecipes();

    return (
        <div className="parent">
            <Carousel
                responsive={responsive}
                autoPlay={true}
                autoPlaySpeed={7000}
                swipeable={true}
                draggable={true}
                showDots={true}
                infinite={true}
                partialVisible={false}
                dotListClass="custom-dot-list-style"
            >
                {recipes.map((recipe, index) => {
                    return (
                        <div className="slider" key={index}>
                            <Link to={`/recipes/${recipe.idMeal}`}><img src={recipe.strMealThumb} alt="recipe" /></Link>
                        </div>
                    );
                })}
            </Carousel>
        </div>
    );
};

