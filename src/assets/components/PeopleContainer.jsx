import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPeople } from "../store/slices/people";
import Person from "./Person";


export default function PeopleContainer() {
  const dispatch = useDispatch();
  console.log(useSelector(state => state), "hola")

  const peopleIds = useSelector(state => state.people.ids);

  useEffect(()=> {
    dispatch(fetchPeople());
    console.log("sucedio")
  }, []);

  return (
    <Suspense fallback>
      {
        peopleIds.map(id => <Person id={id} />)
      }
    </Suspense>
  )
}