import { useEffect, useState } from "react";
import { ICategoryItem } from "./types";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {

    const [list, setList] = useState<ICategoryItem[]>([]);

    useEffect(() => {
        const result = axios.get<ICategoryItem[]>('http://127.0.0.1:8000/api/category').then(resp=> {
            //console.log("axios result", resp);
            setList(resp.data);
        }
        )
        .catch(bad=> {
            console.log("bad request", bad)}
        );
      }, []);

    const onAddCategory=() => {
        
            
    }
    const dataView = list.map(category=>
        <tr key={category.id}>
            <th><img src={category.image} alt='фотка' width={75}></img></th>
            <td>{category.name}</td>
            <td>{category.description}</td>
          </tr>
          );
    return(
        <>
            <h1 className="text-center">Список категорій</h1>
            <Link to="/categories/create" className="btn btn-success">Додати</Link>
            <table className="table">
        <thead>
          <tr>
            <th scope="col">Фото</th>
            <th scope="col">Назва</th>
            <th scope="col">Опис</th>
          </tr>
        </thead>
        <tbody>
          {dataView}
        </tbody>
      </table>
        </>
    );
};

export default HomePage;