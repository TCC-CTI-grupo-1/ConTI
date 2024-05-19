using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _3Bimestre
{
    public partial class FrmPlanetas : System.Windows.Forms.Form
    {
        public FrmPlanetas()
        {
            InitializeComponent();
        }


        private void marte_CheckedChanged(object sender, EventArgs e)
        {
            RadioButton rb = sender as RadioButton;
            if (rb.Checked)
            {
                DialogResult result = MessageBox.Show("Você quer continuar?", "Confirmação", MessageBoxButtons.OKCancel);
                if (result == DialogResult.OK)
                {
                    Planeta frmPlanetaSelecionado = new Planeta("Marte", false, 1.524, 0.372, "É o planeta vermelho, por causa da presença de óxido de ferro em sua superfície. Ele tem dois pequenos satélites, Fobos e Deimos, que são irregulares e parecem asteroides. Ele também tem o maior vulcão do Sistema Solar, o Olympus Mons, que mede cerca de 22 km de altura.");
                    frmPlanetaSelecionado.ShowDialog();
                }
            }
        }

        private void venus_CheckedChanged(object sender, EventArgs e)
        {
            RadioButton rb = sender as RadioButton;
            if (rb.Checked)
            {
                DialogResult result = MessageBox.Show("Você quer continuar?", "Confirmação", MessageBoxButtons.OKCancel);
                if (result == DialogResult.OK)
                {
                    Planeta frmPlanetaSelecionado = new Planeta("Vênus", false, 0.723, 0.266, "É o planeta mais quente do Sistema Solar, com temperaturas que podem ultrapassar 450°C. Ele também gira em sentido contrário ao da maioria dos planetas, ou seja, de leste para oeste.");
                    frmPlanetaSelecionado.ShowDialog();
                }
            }
        }
        private void mercurio_CheckedChanged(object sender, EventArgs e)
        {
            RadioButton rb = sender as RadioButton;
            if (rb.Checked)
            {
                DialogResult result = MessageBox.Show("Você quer continuar?", "Confirmação", MessageBoxButtons.OKCancel);
                if (result == DialogResult.OK)
                {
                    Planeta frmPlanetaSelecionado = new Planeta("Mercúrio", false, 0.387, 0.552, "É o planeta mais próximo do Sol e o menor do Sistema Solar. Ele tem um dia muito longo, equivalente a 58 dias terrestres, e uma noite muito fria, chegando a -170°C");
                    frmPlanetaSelecionado.ShowDialog();
                }
            }
        }
        private void terra_CheckedChanged(object sender, EventArgs e)
        {
            RadioButton rb = sender as RadioButton;
            if (rb.Checked)
            {
                DialogResult result = MessageBox.Show("Você quer continuar?", "Confirmação", MessageBoxButtons.OKCancel);
                if (result == DialogResult.OK)
                {
                    Planeta frmPlanetaSelecionado = new Planeta("Terra", false, 1, 0, "É o único planeta do Sistema Solar que possui vida, graças à presença de água líquida e uma atmosfera adequada. Ela tem um satélite natural, a Lua, que influencia as marés, as fases lunares e os eclipses");
                    frmPlanetaSelecionado.ShowDialog();
                }
            }
        }
        private void jupiter_CheckedChanged(object sender, EventArgs e)
        {
            RadioButton rb = sender as RadioButton;
            if (rb.Checked)
            {
                DialogResult result = MessageBox.Show("Você quer continuar?", "Confirmação", MessageBoxButtons.OKCancel);
                if (result == DialogResult.OK)
                {
                    Planeta frmPlanetaSelecionado = new Planeta("Júpiter", true, 5.203, 3.957, "É o maior planeta do Sistema Solar, sendo mais de 1300 vezes maior do que a Terra. Ele é um planeta gasoso, formado principalmente por hidrogênio e hélio. Ele tem pelo menos 79 satélites naturais, sendo os mais famosos Io, Europa, Ganimedes e Calisto. Ele também tem um sistema de anéis, mas menos visível do que o de Saturno.");
                    frmPlanetaSelecionado.ShowDialog();
                }
            }
        }
        private void saturno_CheckedChanged(object sender, EventArgs e)
        {
            RadioButton rb = sender as RadioButton;
            if (rb.Checked)
            {
                DialogResult result = MessageBox.Show("Você quer continuar?", "Confirmação", MessageBoxButtons.OKCancel);
                if (result == DialogResult.OK)
                {
                    Planeta frmPlanetaSelecionado = new Planeta("Saturno", true, 9.537, 8.05, "É o segundo maior planeta do Sistema Solar e o mais conhecido por seus anéis, formados por poeira cósmica, gelo e rochas. Ele tem pelo menos 82 satélites naturais, sendo o maior deles Titã, que possui uma atmosfera densa e lagos de metano líquido.");
                    frmPlanetaSelecionado.ShowDialog();
                }
                 
            }

        }
        private void urano_CheckedChanged(object sender, EventArgs e)
        {
            RadioButton rb = sender as RadioButton;
            if (rb.Checked)
            {
                DialogResult result = MessageBox.Show("Você quer continuar?", "Confirmação", MessageBoxButtons.OKCancel);
                if (result == DialogResult.OK)
                {
                    Planeta frmPlanetaSelecionado = new Planeta("Urano", true, 19.191, 17.292, "É o sétimo planeta do Sistema Solar e o terceiro maior. Ele é um planeta gasoso, formado principalmente por hidrogênio, hélio e metano. Ele tem uma inclinação axial muito grande, de cerca de 98 graus, o que faz com que ele gire praticamente deitado. Ele tem 27 satélites naturais conhecidos e um sistema de anéis muito fino.");
                    frmPlanetaSelecionado.ShowDialog();
                }
            }
        }
        private void netuno_CheckedChanged(object sender, EventArgs e)
        {
            RadioButton rb = sender as RadioButton;
            if (rb.Checked)
            {
                DialogResult result = MessageBox.Show("Você quer continuar?", "Confirmação", MessageBoxButtons.OKCancel);
                if (result == DialogResult.OK)
                {
                    Planeta frmPlanetaSelecionado = new Planeta("Netuno", true, 30.069, 28.817, "É o oitavo e último planeta do Sistema Solar e o quarto maior. Ele é um planeta gasoso, formado principalmente por hidrogênio, hélio e metano. Ele tem 14 satélites naturais conhecidos, sendo o maior deles Tritão, que possui uma atmosfera fina e gêiseres de nitrogênio líquido. Ele também tem um sistema de anéis muito fraco.");
                    frmPlanetaSelecionado.ShowDialog();
                }
            }
        }
    }
}
