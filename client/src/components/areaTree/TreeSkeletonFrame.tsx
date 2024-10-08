// import { useState, useEffect } from "react"
// import { handleGetAreasTree } from "../../controllers/areasController"
// import { Tree } from "../../../../server/src/types/client/interfaces"
// import { AreaDTO } from "../../../../server/src/DTO/AreaDTO"
// import { Area_ProfileDTO } from "../../../../server/src/DTO/Area_ProfileDTO"
// import TreeSkeleton from "./TreeSkeleton"
// import Branch from "./Branch"
// import Leaf from "./Leaf"
// const TreeSkeletonFrame = () => {
//     const [areaTree, setAreaTree] = useState<Tree<AreaDTO|Area_ProfileDTO> | null>(null)

//     useEffect(() => {
//         handleGetAreasTree().then((tree) => {
//             setAreaTree(tree)
//         })
//     }, [])

//   return (
//     <>
//     <div>TreeSkeletonFrame</div>
//         {
//             areaTree && <TreeSkeleton tree={areaTree.tree} root={areaTree.root} Leaf={Leaf} Branch={Branch}/>
//         }
//     </>
//   )
// }

// export default TreeSkeletonFrame