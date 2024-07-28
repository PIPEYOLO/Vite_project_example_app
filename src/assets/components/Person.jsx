import { useDispatch, useSelector } from "react-redux"
import PeopleContainer from "./PeopleContainer";
import { memo, useCallback } from "react";
import { removePerson } from "../store/slices/people";


const Person = memo(function ({ id }) {
  const dispatch = useDispatch();
  const person = useSelector(state => state.people.entities[id]);
  console.log(person);
  return (
    <div>
      <h4>Hello i am {person.id}</h4>
      <button
       onClick={
          useCallback(()=> {
            dispatch(removePerson(id));
          }, [id])
        }
       style={{ background: "red" }}>delete</button>
    </div>
  )
}, (prev, next) => prev.id === next.id);


export default Person;