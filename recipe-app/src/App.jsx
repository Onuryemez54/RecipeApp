import { Box, ThemeProvider } from "@mui/material";
import { Navbar } from "./components/Navbar";
import { useEffect, useState } from "react";
import { BD_SEARCH_BASE_URL } from "./urls.js";
import { AppRouter } from "./AppRouter";
import { useRecipesDispatch } from "./modules/recipes/RecipesProvider";
import { RecipeActionType } from "./modules/recipes/models";
import { UserProvider } from "./modules/user/UserProvider";
import { FavoritesProvider } from "./modules/user/FavoritesProvider";
import { customTheme } from "./components/Theme/theme";

const App = () => {
	const [mode, setMode] = useState('light');
	const theme = customTheme(mode);

	const dispatch = useRecipesDispatch();


	useEffect(() => {
		const abortCont = new AbortController();

		const getURL = async () => {
			try {
				const res = await fetch(BD_SEARCH_BASE_URL, {
					signal: abortCont.signal,
				});
				const data = await res.json();
				if (data.meals) {
					dispatch({ type: RecipeActionType.ADD_RECIPES, payload: data.meals })
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		getURL();

		return () => abortCont.abort();
	}, [dispatch]);

	return (
		<ThemeProvider theme={theme}>
			<UserProvider>
				<FavoritesProvider>
					<Box bgcolor={theme.palette.background.default} color={theme.palette.text.primary}>
						<Navbar mode={mode} setMode={setMode} />
						<AppRouter />
					</Box>
				</FavoritesProvider>
			</UserProvider>
		</ThemeProvider>
	);
};

export default App;
