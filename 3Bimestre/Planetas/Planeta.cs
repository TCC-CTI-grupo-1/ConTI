using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Resources;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _3Bimestre
{
    public partial class Planeta : System.Windows.Forms.Form
    {
        public Planeta(string planeta, bool tipo, double distanciaSol, double distanciaTerra, string curiosidade)
        {
            InitializeComponent();
            this.Text = planeta;
            lbl_Planeta.Text = planeta;
            var images = typeof(Properties.Resources)
               .GetProperties(BindingFlags.Static | BindingFlags.NonPublic |
                                                    BindingFlags.Public)
               .Where(p => p.PropertyType == typeof(Bitmap))
               .Select(x => new { Name = x.Name, Image = x.GetValue(null, null) })
               .ToList();
            try
#pragma warning disable CS0168 // Variable is declared but never used
            {
                var value = images.First(item => item.Name == planeta);
                this.BackgroundImage = (Image)value.Image;
            }catch(Exception ex) {
                MessageBox.Show("Erro nos arquivos! Imagem do planeta não foi encontrada\nCarregando imagem padrão.", "Erro!");
                this.BackgroundImage = Properties.Resources._4a8489df1c3eb6333c4dccd1638d6e83;}
#pragma warning restore CS0168 // Variable is declared but never used
            lbl_curiosities.Text = curiosidade;
            lbl_dynType.Text = !tipo ? "Rochoso" : "Gasoso";
            lbl_distSol.Text = distanciaSol.ToString() + "ua";
            lbl_distTerra.Text = distanciaTerra.ToString() + "ua";
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void Planeta_Load(object sender, EventArgs e)
        {

        }

        private void groupBox1_Enter(object sender, EventArgs e)
        {

        }

        private void label1_Click_1(object sender, EventArgs e)
        {

        }

        private void lbl_type_Click(object sender, EventArgs e)
        {

        }

        private void lbl_dynType_Click(object sender, EventArgs e)
        {

        }

        private void lbl_distSol_Click(object sender, EventArgs e)
        {

        }

        private void groupBox1_Enter_1(object sender, EventArgs e)
        {

        }

        private void lbl_distTerra_Click(object sender, EventArgs e)
        {

        }
    }
}
