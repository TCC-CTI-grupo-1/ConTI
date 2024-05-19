using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Windows.Forms;
using Dapper;
using Npgsql;
using ONG_Animal;

namespace _3Bimestre.ONG_Animal
{
    public partial class FrmPrincipal : Form, Menu
    {
        Util Utilidade= new Util();
        NpgsqlConnection conexao;
        int IdAnimal = 0;
        int IdAdotante = 0;
        int IdAdocao = 0;
        public FrmPrincipal()
        {
            InitializeComponent();
            conexao = Utilidade.ConectarComDB();

            Utilidade.ExecutarComandoDB("SELECT * FROM adocao;",conexao,DtgAdocao);
            fillDataGrid();

            Listas();
        }
        private void fillDataGrid()
        {
            try
            {
                string query = "SELECT * FROM adoption;";
                this.conexao.Open();
                using (NpgsqlDataAdapter da = new NpgsqlDataAdapter(query, conexao))
                {
                    using (DataTable dt = new DataTable())
                    {
                        da.Fill(dt);
                        DtgAdocao.DataSource = dt;
                    }
                }
                this.conexao.Close();

            }
            catch (NpgsqlException ex)
            {
                MessageBox.Show("Erro: " + ex.Message);
            }
        }


        private void TsmiAnimal_Click(object sender, EventArgs e)
        {
            FrmAnimal frmAnimal = new FrmAnimal();
            frmAnimal.ShowDialog();
        }

        private void TsmiAdotante_Click(object sender, EventArgs e)
        {
            FrmAdotante frmAdotante = new FrmAdotante();
            frmAdotante.ShowDialog();
        }

        private void TsmiAjuda_Click(object sender, EventArgs e)
        {
            FrmAjuda frmaAjuda = new FrmAjuda();
            frmaAjuda.ShowDialog();
        }

        



        private void Listas()
        {

            try
            {
                var queryAdotante = "SELECT name FROM adopter;";
                var queryAnimal = "SELECT name FROM animal";
                dynamic pessoas, animais;
                using (conexao)
                {
                    pessoas = conexao.Query<Adotante>(sql: queryAdotante);
                    animais = conexao.Query<Animal>(sql: queryAnimal);
                }
                foreach (dynamic p in pessoas) CblAdotante.Items.Add(p.name);
                foreach (dynamic a in animais) CblAnimal.Items.Add(a.name);
            }
            catch (NpgsqlException ex)
            {
                MessageBox.Show("Erro: " + ex.Message);


            }

        }
        //  private IEnumerable<Adotante> ListaAdotante()
        //    {
        //       try
        //    {

        //           var query = "SELECT nome FROM  adotante;";

        ///       using (conexao)
        //     {
        //         return conexao.Query<Adotante>(sql: query);

        //  }
        ///   }
        //   catch (NpgsqlException ex)
        //  {
        //   MessageBox.Show("Erro: " + ex.Message);
        //    return Enumerable.Empty<Adotante>();

        // }
        // }



        private void BtnNovaAdocao_Click(object sender, EventArgs e)
        {
            if (
                Utilidade.nenhumCampoVazio( 
                    CblAnimal.Text,
                    CblAdotante.Text,
                    CblStatus.Text, 
                    CblInformaçoes.Text)
                )
            {
                Adicionar();
            }
            else
            {
                MessageBox.Show("Campos obrigatorios não preenchidos!!");
                List<dynamic> campos = new List<dynamic> { CblAnimal.Text,
                    CblAdotante.Text,
                    CblStatus.Text,
                    CblInformaçoes.Text
                };
                foreach(dynamic campo in campos)
                {
                    if (string.IsNullOrEmpty(campo))
                    {
                        Utilidade.mudarFonteParaNegrito(campo);
                    }
                }

            }


        }


        private void BtnBusca_Click(object sender, EventArgs e)
        {
            //Pesquisa de Adoção 
            String busca = this.TxtBusca.Text;
            string query = "SELECT an.nome AS animal, an.tipo,ad.nome AS adotante,ac.data_adocao,ac.status,ac.informacoes ," +
                "FROM adocao AS ac ,INNER JOIN animal AS an ON ac.animal = an.id ,INNER JOIN adotante AS ad ON ac.adotante = ad.id," +
                $"WHERE ad.nome LIKE '%{busca}%' or an.nome LIKE '%{busca}%';";

            Utilidade.ExecutarComandoDB(query,conexao,DtgAdocao);
        }

        protected void Adicionar()
        {

            string animal = this.CblAnimal.Text;
            string adotante = this.CblAdotante.Text;
            string Status = this.CblStatus.Text;
            string informacoes = this.CblInformaçoes.Text;
            string query = "INSERT INTO adotante(animal, adotante, status, informacoes)" +
                              $"VALUES('{animal}','{adotante}','{Status}','{informacoes}';";
            Utilidade.ExecutarComandoDB(query, conexao, DtgAdocao);
        }

        private void CblAnimal_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                string query = $"SELECT id FROM animal" +
                    $"WHERE nome= '{CblAnimal.Text}';";
                dynamic animal = conexao.Query<Animal>(sql: query);
                this.IdAnimal = animal[0].Id;
            }
            catch (NpgsqlException ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
    }
}
