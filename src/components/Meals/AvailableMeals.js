import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItems/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://foodordering-3e8e7-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong!");
      }
      const responseData = await response.json();
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={styles.MealsLoading}>
        <p>Is Loading</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={styles.MealsLoading}>
        <p>{httpError}</p>
      </section>
    );
  }
  const mealList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    >
      {meal.name}
    </MealItem>
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
