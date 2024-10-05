import {Tree} from "../../../server/src/types/client/interfaces";
import {AreaDTO} from "../../../server/src/DTO/AreaDTO";
import {Area_ProfileDTO} from "../../../server/src/DTO/Area_ProfileDTO";
import React from "react";
interface Props<T> {
    tree: Tree<T>
    root: T  
    Leaf: React.ComponentType<{prop:T}>
    Branch: React.ComponentType<{prop:T}>
}

const TreeSkeleton = (props:Props<AreaDTO|Area_ProfileDTO>) =>
{
    const {tree, root, Leaf, Branch} = props;

    const renderTree = (node:AreaDTO|Area_ProfileDTO) =>{
        return (
            <div>
                {tree["id" in node? node.id : node.area_id].length === 0? <Leaf prop={node}/> : <Branch prop={node}/>}
                {tree["id" in node? node.id : node.area_id].map((child) => renderTree(child))}
            </div>
        )
    }
    return (<>
        {renderTree(root)}
    </>)
}
export default TreeSkeleton;    
