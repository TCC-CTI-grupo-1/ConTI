using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ONG_Animal
{

    internal class Animal
    {
        public int Id { get; set; }
        public string name { get; set; }

        public string Genero { get; set; }

        public DateTime Data_Nascimento { get; set; }

        public Boolean DisponibilidadeAdocao { get; set; }
        public string Tipo { get; set; }

        public string Vacinacao { get; set; }

        public string Status { get; set; }
        public Animal()
        {
        }
    }
}
