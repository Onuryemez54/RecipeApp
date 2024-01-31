import { Box, Card, CardContent, CardMedia, Grid, List, ListItem, ListItemButton, ListItemText, Skeleton, Typography } from '@mui/material'
import { MenuBook } from '@mui/icons-material';
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles'
import { useRecipes } from '../RecipesProvider';



export const RecipeList = () => {

	const recipes = useRecipes();
	console.log('recipe:', recipes)

	const theme = useTheme();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 1000)
	}, []);

	return (


		<Grid container spacing={3} padding={7} justifyContent='center' >
			{recipes.map((recipe) => {
				if (recipe.strMealThumb) {
					return (
						<Grid item md={3} key={recipe.idMeal}>
							<Card sx={{ '&:hover': { color: theme.palette.primary.light } }} >
								<CardContent>
									<Typography variant='subtitle1'>{recipe.strMeal}</Typography>
									<Typography variant='subtitle2'>{recipe.strArea}</Typography>
								</CardContent>
								{loading ? (
									<Skeleton
										variant='rectangular'
										sx={{ height: { xs: '150px', md: '300px' }, borderRadius: '5px' }}
										animation='wave' />
								) : (

									<Link to={`/recipes/${recipe.idMeal}`}>
										<CardMedia
											sx={{ height: { xs: '150px', md: '300px' }, borderRadius: '5px', '&:hover': { opacity: '0.7' } }}
											component="img"
											image={recipe.strMealThumb}
										/>
									</Link>
								)}
							</Card>
						</Grid>
					)
				} else {
					return null
				}
			})}

		</Grid>



	)
}
