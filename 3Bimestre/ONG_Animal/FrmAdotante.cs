using _3Bimestre.Properties;
using Dapper;
using Npgsql;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _3Bimestre.ONG_Animal
{
    public partial class FrmAdotante : Form
    {
        NpgsqlConnection conexao;
        public FrmAdotante()
        {
            InitializeComponent();
            conexao = new NpgsqlConnection(
                connectionString: "Server = localhost; Port = 5432; User ID = postgres; Password = postgres; Database = Windows Forms; Pooling = true");
            fillDataGrid();
        }

        private void fillDataGrid()
        {
            try
            {
                this.conexao.Open();
                string query = "SELECT * FROM adopter;";
                using (NpgsqlDataAdapter da = new NpgsqlDataAdapter(query, conexao))
                {
                    using (DataTable dt = new DataTable())
                    {
                        da.Fill(dt);
                        DtgAdotante.DataSource = dt;
                    }
                }
                this.conexao.Close();

            }
            catch (NpgsqlException ex)
            {
                MessageBox.Show("Erro: " + ex.Message);
            }
        }

        private void executarComandoDB(string query)
        {
            try
            {
                this.conexao.Open();
                conexao.Query(sql: query);
                this.conexao.Close();

            }
            catch (NpgsqlException ex)
            {
                MessageBox.Show("Erro: " + ex.Message);
            }

        }

        private void LblGenero_Click(object sender, EventArgs e)
        {

        }

        private void TxtGenero_TextChanged(object sender, EventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void BtnNovoAdotante_Click(object sender, EventArgs e)
        {
            if (!string.IsNullOrEmpty(TxtCidade.Text) &&
               !string.IsNullOrEmpty(TxtCpf.Text) &&
               !string.IsNullOrEmpty(TxtEndereco.Text) &&
               !string.IsNullOrEmpty(TxtEstado.Text) &&
               !string.IsNullOrEmpty(TxtNome.Text) &&
               !string.IsNullOrEmpty(TxtRg.Text) &&
               !string.IsNullOrEmpty(TxtTelefone.Text))
            {
                novoAdotante();
            }
            else
            {
                MessageBox.Show("Campos obrigatorios não preenchidos!!");

                if (string.IsNullOrEmpty(TxtCidade.Text))
                    LblCidade.Font = new Font(this.Font, FontStyle.Bold);
                if (string.IsNullOrEmpty(TxtCpf.Text))
                    LblCpf.Font = new Font(this.Font, FontStyle.Bold);
                if (string.IsNullOrEmpty(TxtEndereco.Text))
                    LblEndereco.Font = new Font(this.Font, FontStyle.Bold);
                if (string.IsNullOrEmpty(TxtEstado.Text))
                    LblEstado.Font = new Font(this.Font, FontStyle.Bold);
                if (string.IsNullOrEmpty(TxtNome.Text))
                    LblNome.Font = new Font(this.Font, FontStyle.Bold);
                if (string.IsNullOrEmpty(TxtRg.Text))
                    LblRg.Font = new Font(this.Font, FontStyle.Bold);
                if (string.IsNullOrEmpty(TxtTelefone.Text))
                    LblTelefone.Font = new Font(this.Font, FontStyle.Bold);

            }
        }
        private void novoAdotante()
        {

            string nome = TxtNome.Text;
            string cpf = TxtCpf.Text;
            string rg = TxtRg.Text;
            string endereco = TxtEndereco.Text;
            string estado = TxtEstado.Text;
            string telefone = TxtTelefone.Text;
            string cidade = TxtCidade.Text;
            var date = DtpDataNascimento.Value.Date;
            string query = "INSERT INTO adopter(name, rg, cpf, birth_date, address, city, state, telephone)" +
                              $"VALUES('{nome}', '{rg}', '{cpf}', '{date}', '{endereco}', " +
                              $"'{cidade}', '{estado}', '{telefone}')";
            executarComandoDB(query);
            fillDataGrid();
        }

        private void FrmAdotante_Load(object sender, EventArgs e)
        {

        }

        private void DtpDataNascimento_ValueChanged(object sender, EventArgs e)
        {

        }

        private void BtnBusca_Click(object sender, EventArgs e)
        {

        }
    }
}