import { handleGetAreasTree } from "../controllers/areasController"
import { useState, useEffect } from "react"
const AreasTree = () => {
  const [areasTree, setAreasTree] = useState<null>(null)

  useEffect(() => {
    const fetchAreasTree = async () => {
      const areasTree = await handleGetAreasTree()
      setAreasTree(areasTree)
    }
    fetchAreasTree();
  }, []);

  useEffect(() => {
    console.log("Areqas tree (suposta tree): ");
    console.log(areasTree)
  }, [areasTree])

  /*
  export interface areaTreeInterface{
    "areaTree": {
          "tree": {
              [key: string]: {
                  "id": number,
                  "name": string,
                  "parent_id": number,
              }[]
          }[],
          "root": {
              "id": number,
              "name": string,
          }
      }
  }
  */
  return (
    <div>
      <h1>Áreas</h1>
    </div>
  )
}

export default AreasTree