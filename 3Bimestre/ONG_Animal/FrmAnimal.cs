using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using _3Bimestre.ONG_Animal;
using Dapper;
using Npgsql;
using ONG_Animal;

namespace ONG_Animal
{
    public partial class FrmAnimal : Form
    {
        NpgsqlConnection conexao;

        int IdAnimal = 0;

        public FrmAnimal()
        {
            InitializeComponent();

            conexao = new NpgsqlConnection(connectionString:
                "Server=localhost; " +
                "Port=5432; " +
                "User ID=postgres; " +
                "Password=postgres; " +
                "Database=projeto_2b; " +
                "Pooling=true;"
            );

            CarregarDados(null);
        }

        private void TsmiAnimais_Click(object sender, EventArgs e)
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
            FrmAjuda frmAjuda = new FrmAjuda();
            frmAjuda.ShowDialog();
        }

        private void CarregarDados(string comando)
        {
            string query = comando != null
                           ? comando
                           : "SELECT * FROM animal";

            try
            {
                conexao.Open();

                using (NpgsqlDataAdapter da = new NpgsqlDataAdapter(query, conexao))
                {
                    using (DataTable dt = new DataTable())
                    {
                        da.Fill(dt);
                        DtgAnimal.DataSource = dt;
                    }
                }
                tslAnimal.Text = "Pronto!";

                conexao.Close();
            }
            catch (NpgsqlException ex)
            {
                MessageBox.Show("ERRO: " + ex.Message);
                tslAnimal.Text = ex.Message;
            }


        }

        private void BtnBusca_Click(object sender, EventArgs e)
        {
            string query = "SELECT * FROM aimal" +
                $"WHERE ad.nome LIKE '%{TxtBusca.Text}%' or an.nome LIKE '%{TxtBusca.Text}%';";
            CarregarDados(query);
        }

        private void BtnNovo_Click(object sender, EventArgs e)
        {
            if (!string.IsNullOrEmpty(TxtAnimalNome.Text) &&
                !string.IsNullOrEmpty(TxtAnimalTipo.Text) &&
                !string.IsNullOrEmpty(TxtGenero.Text) &&
                !string.IsNullOrEmpty(TxtSituacao.Text) &&
                !string.IsNullOrEmpty(TxtVacinacao.Text) &&
                !string.IsNullOrEmpty(TxtDisponivel.Text))
            {
                try
                {
                    //Tratamento da data de adoção
                    var day = DtpDataNascimento.Value.Day;
                    var month = DtpDataNascimento.Value.Month;
                    var year = DtpDataNascimento.Value.Year;
                    string dataAnimal = year + "/" + month + "/" + day;
                    string tipo = TxtAnimalTipo.Text;
                    string animal = TxtAnimalNome.Text;
                    string genero = TxtGenero.Text;
                    string status = TxtSituacao.Text;
                    string vacinacao = TxtVacinacao.Text;
                    string disponivel = TxtDisponivel.Text;

                    if (this.IdAnimal != 0)
                    {
                        var query = "INSERT INTO animal (id,nome,tipo,genero,data_nascimento,vacinacao,disponibilidade_adocao,status)" +
                            " VALUES " +
                            $"({this.IdAnimal},'{animal}','{tipo}','{genero}','{dataAnimal}','{vacinacao}','{disponivel}'" +
                            $"'{status}')";

                        conexao.Query(sql: query); //Executa a inserção de dados
                        MessageBox.Show("Novao animal adicionado com sucesso!");
                        LimpaCampos();
                        CarregarDados(null); //Carrega lista atualizada com o novo registro
                    }
                    else
                    {
                        MessageBox.Show("Animal não encontrado!");
                        tslAnimal.Text = "Animal não encontrado!";
                    }
                }
                catch (NpgsqlException ex)
                {
                    MessageBox.Show("Erro: " + ex.Message);
                    tslAnimal.Text = ex.Message;
                }
            }
            else
            {
                MessageBox.Show("Campos obrigatórios não preenchidos!");
                if (string.IsNullOrEmpty(TxtAnimalNome.Text))
                    LblNomeAnimal.Font = new Font(this.Font, FontStyle.Bold);
                if (string.IsNullOrEmpty(TxtAnimalTipo.Text))
                    LblTipoAnimal.Font = new Font(this.Font, FontStyle.Bold);
                if (string.IsNullOrEmpty(TxtGenero.Text))
                    LblGenero.Font = new Font(this.Font, FontStyle.Bold);
                if (string.IsNullOrEmpty(TxtVacinacao.Text))
                    LblVacinacao.Font = new Font(this.Font, FontStyle.Bold);
                if (string.IsNullOrEmpty(TxtAnimalTipo.Text))
                    LblTipoAnimal.Font = new Font(this.Font, FontStyle.Bold);
                if (string.IsNullOrEmpty(TxtSituacao.Text))
                    LblStatusAnimal.Font = new Font(this.Font, FontStyle.Bold);
                if (string.IsNullOrEmpty(TxtDisponivel.Text))
                    LblDispo.Font = new Font(this.Font, FontStyle.Bold);
            }
        }

        private void LimpaCampos()
        {
            TxtAnimalNome.ResetText();
            TxtAnimalTipo.ResetText();
            TxtGenero.Clear();
            TxtSituacao.ResetText();
            TxtVacinacao.Clear();
            TxtDisponivel.Clear();
        }

        private void DtgAnimal_RowHeaderMouseClick(object sender, DataGridViewCellMouseEventArgs e)
        {
            try
            {
                this.IdAnimal = (int)DtgAnimal.SelectedRows[0].Cells[1].Value;

                var nomeAnimal = DtgAnimal.SelectedRows[0].Cells[2].Value;
                var tipoAnimal = DtgAnimal.SelectedRows[0].Cells[5].Value;
                var generoAnimal = DtgAnimal.SelectedRows[0].Cells[6].Value;
                var disponivelAnimal = DtgAnimal.SelectedRows[0].Cells[7].Value;
                var vacinaAnimal = DtgAnimal.SelectedRows[0].Cells[8].Value;
                var situacaoAnimal = DtgAnimal.SelectedRows[0].Cells[9].Value;

                var newDate = ToString().Split('/');
                int d = int.Parse(newDate[0]);
                int m = int.Parse(newDate[1]);
                int y = int.Parse(newDate[2].Split(' ')[0]);

                DtpDataNascimento.Value = new DateTime(y, m, d);

                TxtAnimalNome.Text = nomeAnimal.ToString();
                TxtAnimalTipo.Text = tipoAnimal.ToString();

                TxtSituacao.Text = situacaoAnimal.ToString();
                TxtGenero.Text = generoAnimal.ToString();
                TxtDisponivel.Text = disponivelAnimal.ToString();
                TxtVacinacao.Text = vacinaAnimal.ToString();
                TxtGenero.Text = generoAnimal.ToString();

                BtnEditar.Visible = true;
                BtnExcluir.Visible = true;
                BtnCancelar.Visible = true;
                BtnNovo.Visible = false;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Erro: " + ex.Message);
                tslAnimal.Text = ex.Message;
            }
        }
        private void Reset()
        {
            BtnEditar.Visible = false;
            BtnExcluir.Visible = false;
            BtnCancelar.Visible = false;
        }

        private void BtnCancelar_Click(object sender, EventArgs e)
        {
            LimpaCampos();
            Reset();
            CarregarDados(null);
        }

        private void BtnEditar_Click(object sender, EventArgs e)
        {
            try
            {
                var update = $"UPDATE animal SET nome='{TxtAnimalNome.Text}',tipo='{TxtAnimalTipo.Text}', " +
                             $"genero='{TxtGenero.Text}',data_nascimento={DtpDataNascimento}" +
                             $"vacinacao = '{TxtVacinacao.Text}',disponibilidade_adocao='{TxtDisponivel.Text}'," +
                             $"status='{TxtSituacao.Text}' WHERE id = {this.IdAnimal}";
                conexao.Query(sql: update);
                MessageBox.Show("Dados atualizados com sucesso!!!");
                LimpaCampos();
                Reset();
                CarregarDados(null);
            }
            catch (NpgsqlException ex)
            {
                MessageBox.Show("Erro: " + ex.Message);
                tslAnimal.Text = ex.Message;
            }
        }

        private void BtnExcluir_Click(object sender, EventArgs e)
        {
            DialogResult resultado = MessageBox.Show("Deseja excluir este registro?",
                                                     "Atenção!!!",
                                                     MessageBoxButtons.YesNo);
            if (resultado == DialogResult.Yes)
            {
                try
                {
                    var delete = $"DELETE FROM animal WHERE id = {this.IdAnimal}";
                    conexao.Query(sql: delete);
                    MessageBox.Show("Animal excluído com sucesso!!!");
                    LimpaCampos();
                    Reset();
                    CarregarDados(null);
                }
                catch (NpgsqlException ex)
                {
                    MessageBox.Show("Erro: " + ex.Message);
                    tslAnimal.Text = ex.Message;
                }
            }
        }

        private void FrmAnimal_Load(object sender, EventArgs e)
        {

        }

        private void toolStripStatusLabel1_Click(object sender, EventArgs e)
        {

        }

        private void Frm_Load_1(object sender, EventArgs e)
        {

        }
    }
}