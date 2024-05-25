import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuOptionGroup,
    Button,
    Checkbox,
  } from '@chakra-ui/react'
import { showAlert } from '../../App';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import Question from './Question';
import { name } from 'file-loader';

interface options{
    ano: string[];
    dificuldade: string[];
    disciplina: string[];
    alreadyAnswered: boolean;
    mySimulations: boolean;
}

const Filters = () => {

    const [options, setOptions] = useState<options>({
        ano: ['2024', '2023', '2022'],
        dificuldade: ['easy', 'medium', 'hard', 'take-the-l'],
        disciplina: ['math', 'port', 'naturais', 'humanas'],
        alreadyAnswered: false,
        mySimulations: false
    });

    function handleSelectChange(e: any, option: 'ano' | 'dificuldade' | 'disciplina'){
        let newOptions = options;
        newOptions[option] = e;
        console.log(newOptions);
        setOptions(newOptions);
    }

  return (
    <div id='questions'>
        <div className='filters box'>
            <h3>Filtros</h3>
            <div className="options">
                <div>
                    <Menu closeOnSelect={false}>
                        {({ isOpen }) => (
                            <>
                                <MenuButton as={Button} colorScheme={isOpen ? 'blue' : 'gray'} rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}>
                                    Ano
                                </MenuButton>
                                <MenuList minWidth='240px'>
                                    <MenuOptionGroup title='Ano' type='checkbox'
                                    onChange={(e) => {
                                        //console.log(e);
                                        handleSelectChange(e, 'ano');
                                    }}>
                                        <MenuItemOption value='2024'>2024</MenuItemOption>
                                        <MenuItemOption value='2023'>2023</MenuItemOption>
                                        <MenuItemOption value='2022'>2022</MenuItemOption>
                                    </MenuOptionGroup>
                                </MenuList>
                            </>
                        )}
                        
                    </Menu>
                </div>
                
                <div>
                    <Menu closeOnSelect={false}>
                        {({ isOpen }) => (
                            <>
                                <MenuButton as={Button} colorScheme={isOpen ? 'blue' : 'gray'} rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}>
                                    Dificuldade
                                </MenuButton>
                                <MenuList minWidth='240px'>
                                    <MenuOptionGroup title='Dificuldade' type='checkbox'
                                    onChange={(e) => {
                                        handleSelectChange(e, 'dificuldade');
                                    }}
                                    >
                                        <MenuItemOption value='easy'>Fácil</MenuItemOption>
                                        <MenuItemOption value='medium'>Médio</MenuItemOption>
                                        <MenuItemOption value='hard'>Difícil</MenuItemOption>
                                        <MenuItemOption value='take-the-l'>Faz o L</MenuItemOption>
                                    </MenuOptionGroup>
                                </MenuList>
                            </>
                        )}
                    </Menu>
                </div>
                
                <div>
                    <Menu closeOnSelect={false}>
                        {({ isOpen }) => (
                            <>
                                <MenuButton as={Button} colorScheme={isOpen ? 'blue' : 'gray'} rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}>
                                    Disciplina
                                </MenuButton>
                                <MenuList minWidth='240px'>
                                    <MenuOptionGroup title='Disciplina' type='checkbox'
                                    onChange={(e) => {
                                        handleSelectChange(e, 'disciplina');
                                    }}
                                    >
                                        <MenuItemOption value='math'>Matemática</MenuItemOption>
                                        <MenuItemOption value='port'>Português</MenuItemOption>
                                        <MenuItemOption value='naturais'>Ciências Naturais</MenuItemOption>
                                        <MenuItemOption value='humanas'>Ciências Humanas</MenuItemOption>
                                    </MenuOptionGroup>
                                </MenuList>
                            </>
                        )}
                    </Menu>
                </div>
                
            
            </div>
            <div className="more-options">
                <p>Excluir questões:</p>
                <Checkbox
                onChange={(e) => {
                    setOptions({...options, alreadyAnswered: e.target.checked});
                }}
                >De meus simulados</Checkbox>
                <Checkbox
                onChange={(e) => {
                    setOptions({...options, mySimulations: e.target.checked});
                }}
                >Já respondidas</Checkbox>
                <Button colorScheme='red' variant={'outline'}
                onClick={() => {
                    showAlert('Faz o L');
                    showAlert('Isso aqui eventualmente vai limpar os filtros', 'warning')
                }}>Limpar filtros</Button>
            </div>
            <div className="buttons">
                <Button colorScheme='blue' variant={'solid'} size={'lg'}>Aplicar filtros</Button>
                <p>ou</p>
                <Button colorScheme='gray' variant={'outline'} size={'lg'}>Voltar ao padrão</Button>
            </div>
        </div>
        <div className="results">
            <div className="header box">
                <h3>Resultados</h3>
                <p>Mostrando 20 de 2000 questões</p>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Ordenar por:
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Ordem alfabética</MenuItem>
                        <MenuItem>Difículdade</MenuItem>
                        <MenuItem>Não sei acentuar</MenuItem>
                    </MenuList>
                </Menu>
            </div>
            <div className="content">
                <Question 
                id={232}
                year={2024}
                difficulty={'easy'}
                subject={{
                    name: 'Matematica',
                    sub: {
                        name: 'Geometría',
                        sub: {
                            name: 'Geometria plana'
                        }
                    }
                }}
                />

                <Question 
                id={232}
                year={2024}
                difficulty={'hard'}
                subject={{
                    name: 'Português',  
                    sub: {
                        name: 'Literatura',
                        sub: {
                            name: 'Dois Ratos'
                        }
                    }
                }}
                />

<Question 
                id={232}
                year={2024}
                difficulty={'easy'}
                subject={{
                    name: 'Matematica',
                    sub: {
                        name: 'Geometría',
                        sub: {
                            name: 'Geometria plana'
                        }
                    }
                }}
                />

                <Question 
                id={232}
                year={2024}
                difficulty={'hard'}
                subject={{
                    name: 'Português',  
                    sub: {
                        name: 'Literatura',
                        sub: {
                            name: 'Dois Ratos'
                        }
                    }
                }}
                />

<Question 
                id={232}
                year={2024}
                difficulty={'easy'}
                subject={{
                    name: 'Matematica',
                    sub: {
                        name: 'Geometría',
                        sub: {
                            name: 'Geometria plana'
                        }
                    }
                }}
                />

                <Question 
                id={232}
                year={2024}
                difficulty={'hard'}
                subject={{
                    name: 'Português',  
                    sub: {
                        name: 'Literatura',
                        sub: {
                            name: 'Dois Ratos'
                        }
                    }
                }}
                />

            </div>
        </div>
    </div>
  )
}

export default Filters