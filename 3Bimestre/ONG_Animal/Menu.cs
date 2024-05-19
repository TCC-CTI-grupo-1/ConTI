using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _3Bimestre.ONG_Animal
{
    internal abstract class Menu
    {
        abstract protected void Editar();
        abstract protected void Deletar();
        abstract protected void Excluir();
        abstract protected void Adicionar();
    }
}
