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
    rootID?: number;
    isBlocks?: boolean;
    userPercentageAreas?: {[id: number]: number};
}


const AreaTree = ({onActiveAreasChange, isRadio=false, rootID, isBlocks=false, userPercentageAreas}: Props) => {

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
        const localRootID = rootID === undefined ? areaTree.areaTree.root.id : rootID;
        return (
            <form>
                <div id={isBlocks ? 'areaTreeBlock' : ''}>
                    <div className="Teste active">{renderChildren(localRootID, 0.8)}</div>
                </div>
            </form>

        )
    }

    function getRGB(userPercentage: number | undefined){
        if(userPercentage === undefined || userPercentage < 0 || userPercentage > 100){
            return 'rgba(255, 255, 255';
        }
        /* (>75%) verde
        (>50%) amarelo
        (<=50%) vermelho*/
        let r = 255;
        let g = 255;
        let b = 255;

        if(userPercentage > 85){
            r = 0;
            g = 182;
            b = 9;
        }

        else if(userPercentage > 70){
            r = 113;
            g = 199;
            b = 0;
        }
        else if(userPercentage > 60){
            r = 222;
            g = 230;
            b = 0;
        }

        else if(userPercentage > 50){
            r = 245;
            g = 177;
            b = 17;
        }
        else{
            r = 245;
            g = 55;
            b = 17;
        }

        return `rgba(${r}, ${g}, ${b}, 1)`;    
    }

    const renderChildren = (id: number, treeLevel: number) => {
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
                                    id={isBlocks ? (id === rootID ? 'realChildren' : '') : ''}
                                    className={'text ' + (!activeAreasIds.includes(child.id) && tree[child.id] !== undefined && tree[child.id].length > 0 ? (!isBlocks && 'togglable') : '')}
                                    style={{
                                        backgroundColor: `rgba(217,217,217,0.5)`,
                                        borderColor: `rgba(0,0,0,${treeLevel})`,
                                        transition: '0.25s',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = getRGB(userPercentageAreas ? userPercentageAreas[child.id] * 100 : undefined);
                                        e.currentTarget.style.color = getRGB(userPercentageAreas ? userPercentageAreas[child.id] * 100 : undefined);
                                        e.currentTarget.style.backgroundColor = `rgba(0,0,0,0.8)`;
                                    }}
                                    onMouseLeave={(e) => {
                                        const currentTarget = e.currentTarget as HTMLDivElement;
                                        setTimeout(() => {
                                            
                                            if (currentTarget) {
                                                currentTarget.style.borderColor = `rgba(0,0,0,${treeLevel})`;
                                                currentTarget.style.color = 'black';
                                                currentTarget.style.backgroundColor = `rgba(217,217,217,0.5)`;
                                            }
                                        }, 100);
                                    }}
                                >
                                    {!isBlocks && (
                                        <p
                                            onClick={(e) => {
                                                // Find the sibling div element with the class 'Teste'
                                                const siblingDiv = e.currentTarget.parentElement!.nextElementSibling;
                                                if (siblingDiv && siblingDiv.classList.contains('Teste')) {
                                                    siblingDiv.classList.toggle('active');
                                                }
                                            }}
                                        >
                                            {child.name}
                                        </p>
                                    )}
                                    {isBlocks && (
                                        <span>
                                            <div>
                                                <p><strong>{child.name}</strong></p>
                                                <p>
                                                    <strong>{userPercentageAreas &&
                                                        (userPercentageAreas[child.id]
                                                            ? (userPercentageAreas[child.id] * 100).toFixed(0) + '%'
                                                            : '(Não feito)')}</strong>
                                                </p>
                                            </div>
                                            <div className="progress">
                                                <div
                                                    className="progress-bar"
                                                    style={{
                                                        width: `${userPercentageAreas && (userPercentageAreas[child.id] ? (userPercentageAreas[child.id] * 100).toFixed(0) : 0)}%`,
                                                        backgroundColor: `${getRGB(userPercentageAreas ? userPercentageAreas[child.id] * 100 : undefined)}, ${
                                                            //change based on the tree level
                                                            treeLevel
                                                        })`,
                                                    }}
                                                ></div>
                                            </div>
                                        </span>
                                    )}
                                    {!isRadio && !isBlocks && (
                                        <input
                                            type="checkbox"
                                            onClick={() => {
                                                if (activeAreasIds.includes(child.id)) {
                                                    setActiveAreasIds(activeAreasIds.filter((id) => id !== child.id));
                                                } else {
                                                    setActiveAreasIds([...activeAreasIds, child.id]);
                                                }
                                            }}
                                        />
                                    )}

                                    {isRadio && (
                                        <input
                                            type={'radio'}
                                            name="area"
                                            onClick={() => {
                                                setActiveAreasIds([child.id]);
                                            }}
                                        />
                                    )}
                                </div>

                                {!activeAreasIds.includes(child.id) && tree[child.id] !== undefined && tree[child.id].length > 0 && (
                                    <div className={'Teste ' + (isBlocks ? 'active' : '')}>{renderChildren(child.id, treeLevel - 0.15)}</div>
                                )}
                            </li>
                        );
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