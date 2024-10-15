import { useState, useEffect } from 'react'
import { areaInterface } from '../controllers/interfaces'
import { handleGetAreasTree } from '../controllers/areasController'
import { showAlert } from '../App'
interface areaTreeInterface{
    areaTree: {
        tree: {
            [key: string]: Array<areaInterface>
        },
        root: areaInterface
    }
}

interface Props{
    onActiveAreasChange: (activeAreasIds: number[]) => void;
    isRadio?: boolean;
}
const AreaTree = ({onActiveAreasChange, isRadio=false}: Props) => {

    const [activeAreasIds, setActiveAreasIds] = useState<number[]>([]);
    const [loadingJORGE, setLoading] = useState<boolean>(true);

    useEffect(() => {
        console.log(activeAreasIds);
        onActiveAreasChange(activeAreasIds);

    }, [activeAreasIds]);

    

    const [areaTree, setAreaTree] = useState<areaTreeInterface>();

    useEffect(() => {
        handleGetAreasTree().then((tree) => {
            setAreaTree(tree);
            console.log("AREA TREE: ");
            console.log(tree);
            
        })
    }, []);

    useEffect(() => {
        if(areaTree){
            setLoading(false);
        }
    }, [areaTree]);

    const renderAreaTree = (areaTree: areaTreeInterface) => {
        const root = areaTree.areaTree.root;
        return (
            <form>
                <div>
                    <div className="Teste active">{renderChildren(root.id)}</div>
                </div>
            </form>

        )
    }

    const renderChildren = (id: number) => {
        if(areaTree){
            const tree = areaTree.areaTree.tree;
            const children = tree[id];
            if(tree[id] === undefined) return null;
            return (
                <ul>
                    {children.map((child) => {
                        return (
                            <li>
                            <div
                                
                                className={'text ' + (!activeAreasIds.includes(child.id) && tree[child.id] !== undefined && tree[child.id].length > 0 ? 'togglable' : '')}
                            >
                                <p
                                onClick={(e) => {
                                    // Find the sibling div element with the class 'Teste'
                                    const siblingDiv = e.currentTarget.parentElement!.nextElementSibling;
                                    if (siblingDiv && siblingDiv.classList.contains('Teste')) {
                                        siblingDiv.classList.toggle('active');
                                    }
                                }}
                                
                                >{child.name}</p>
                                {!isRadio &&<input type="checkbox" onClick={() => {
                                    if(activeAreasIds.includes(child.id)){
                                        setActiveAreasIds(activeAreasIds.filter((id) => id !== child.id));
                                    }else{
                                        setActiveAreasIds([...activeAreasIds, child.id]);
                                    }
                                }} />}
                                
                                {isRadio &&<input type={'radio'} name="area" onClick={() => {
                                    setActiveAreasIds([child.id]);
                                }} />}
                            </div>
                            
                            {!activeAreasIds.includes(child.id) &&
                            tree[child.id] !== undefined && tree[child.id].length > 0 && 
                            <div className="Teste">{renderChildren(child.id)}</div>}
                        </li>

                        )
                    })}
                </ul>
            )
        } else{
            showAlert("Materias não carregadas, por favor recarregue a pagina", "warning");
        }
    }
    loadingJORGE && <p>Loading...</p>
    return (
        <>
        {loadingJORGE ? <p>Loading...</p> :
            <div>

                {areaTree && renderAreaTree(areaTree)}
            </div>
        }
        </>
    )
}

export default AreaTree