using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ONG_Animal
{
    public class Adotante
    {
        public int Id { get; set;}
        public string name { get; set; }
        public string Rg { get; set; }
        public string Cpf { get; set; }
        public string Endereco { get; set; }
        public DateTime Data_Nascimento { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string Telefone { get; set; }


        public Adotante() { 
        }
    }
}
