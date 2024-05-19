namespace _3Bimestre.ONG_Animal
{
    partial class FrmAdotante
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.LblDataNascimento = new System.Windows.Forms.Label();
            this.DtpDataNascimento = new System.Windows.Forms.DateTimePicker();
            this.LblRg = new System.Windows.Forms.Label();
            this.TxtRg = new System.Windows.Forms.TextBox();
            this.LblEndereco = new System.Windows.Forms.Label();
            this.TxtEndereco = new System.Windows.Forms.TextBox();
            this.BtnCancelar = new System.Windows.Forms.Button();
            this.BtnDelete = new System.Windows.Forms.Button();
            this.BtnEditar = new System.Windows.Forms.Button();
            this.BtnNovoAdotante = new System.Windows.Forms.Button();
            this.LblCpf = new System.Windows.Forms.Label();
            this.LblCidade = new System.Windows.Forms.Label();
            this.LblNome = new System.Windows.Forms.Label();
            this.LblEstado = new System.Windows.Forms.Label();
            this.TxtCpf = new System.Windows.Forms.TextBox();
            this.TxtCidade = new System.Windows.Forms.TextBox();
            this.TxtEstado = new System.Windows.Forms.TextBox();
            this.TxtNome = new System.Windows.Forms.TextBox();
            this.LblBusca = new System.Windows.Forms.Label();
            this.BtnBusca = new System.Windows.Forms.Button();
            this.TxtBusca = new System.Windows.Forms.TextBox();
            this.DtgAdotante = new System.Windows.Forms.DataGridView();
            this.LblTelefone = new System.Windows.Forms.Label();
            this.TxtTelefone = new System.Windows.Forms.TextBox();
            ((System.ComponentModel.ISupportInitialize)(this.DtgAdotante)).BeginInit();
            this.SuspendLayout();
            // 
            // LblDataNascimento
            // 
            this.LblDataNascimento.AutoSize = true;
            this.LblDataNascimento.Location = new System.Drawing.Point(472, 29);
            this.LblDataNascimento.Name = "LblDataNascimento";
            this.LblDataNascimento.Size = new System.Drawing.Size(107, 13);
            this.LblDataNascimento.TabIndex = 62;
            this.LblDataNascimento.Text = "Data de Nascimento:";
            // 
            // DtpDataNascimento
            // 
            this.DtpDataNascimento.Location = new System.Drawing.Point(475, 48);
            this.DtpDataNascimento.Name = "DtpDataNascimento";
            this.DtpDataNascimento.Size = new System.Drawing.Size(200, 20);
            this.DtpDataNascimento.TabIndex = 61;
            this.DtpDataNascimento.ValueChanged += new System.EventHandler(this.DtpDataNascimento_ValueChanged);
            // 
            // LblRg
            // 
            this.LblRg.AutoSize = true;
            this.LblRg.Location = new System.Drawing.Point(140, 29);
            this.LblRg.Name = "LblRg";
            this.LblRg.Size = new System.Drawing.Size(24, 13);
            this.LblRg.TabIndex = 60;
            this.LblRg.Text = "Rg:";
            this.LblRg.Click += new System.EventHandler(this.LblGenero_Click);
            // 
            // TxtRg
            // 
            this.TxtRg.Location = new System.Drawing.Point(143, 45);
            this.TxtRg.Name = "TxtRg";
            this.TxtRg.Size = new System.Drawing.Size(174, 20);
            this.TxtRg.TabIndex = 59;
            this.TxtRg.TextChanged += new System.EventHandler(this.TxtGenero_TextChanged);
            // 
            // LblEndereco
            // 
            this.LblEndereco.AutoSize = true;
            this.LblEndereco.Location = new System.Drawing.Point(27, 68);
            this.LblEndereco.Name = "LblEndereco";
            this.LblEndereco.Size = new System.Drawing.Size(56, 13);
            this.LblEndereco.TabIndex = 58;
            this.LblEndereco.Text = "Endereço:";
            // 
            // TxtEndereco
            // 
            this.TxtEndereco.Location = new System.Drawing.Point(30, 87);
            this.TxtEndereco.Name = "TxtEndereco";
            this.TxtEndereco.Size = new System.Drawing.Size(174, 20);
            this.TxtEndereco.TabIndex = 57;
            // 
            // BtnCancelar
            // 
            this.BtnCancelar.BackColor = System.Drawing.Color.MistyRose;
            this.BtnCancelar.Location = new System.Drawing.Point(322, 171);
            this.BtnCancelar.Name = "BtnCancelar";
            this.BtnCancelar.Size = new System.Drawing.Size(84, 24);
            this.BtnCancelar.TabIndex = 56;
            this.BtnCancelar.Text = "Cancelar";
            this.BtnCancelar.UseVisualStyleBackColor = false;
            this.BtnCancelar.Visible = false;
            // 
            // BtnDelete
            // 
            this.BtnDelete.BackColor = System.Drawing.Color.Red;
            this.BtnDelete.Location = new System.Drawing.Point(226, 171);
            this.BtnDelete.Name = "BtnDelete";
            this.BtnDelete.Size = new System.Drawing.Size(84, 24);
            this.BtnDelete.TabIndex = 55;
            this.BtnDelete.Text = "Excluir";
            this.BtnDelete.UseVisualStyleBackColor = false;
            this.BtnDelete.Visible = false;
            // 
            // BtnEditar
            // 
            this.BtnEditar.BackColor = System.Drawing.Color.Yellow;
            this.BtnEditar.Location = new System.Drawing.Point(120, 171);
            this.BtnEditar.Name = "BtnEditar";
            this.BtnEditar.Size = new System.Drawing.Size(84, 24);
            this.BtnEditar.TabIndex = 54;
            this.BtnEditar.Text = "Editar";
            this.BtnEditar.UseVisualStyleBackColor = false;
            this.BtnEditar.Visible = false;
            // 
            // BtnNovoAdotante
            // 
            this.BtnNovoAdotante.BackColor = System.Drawing.Color.Lime;
            this.BtnNovoAdotante.Location = new System.Drawing.Point(14, 171);
            this.BtnNovoAdotante.Name = "BtnNovoAdotante";
            this.BtnNovoAdotante.Size = new System.Drawing.Size(100, 24);
            this.BtnNovoAdotante.TabIndex = 53;
            this.BtnNovoAdotante.Text = "Adicionar";
            this.BtnNovoAdotante.UseVisualStyleBackColor = false;
            this.BtnNovoAdotante.Click += new System.EventHandler(this.BtnNovoAdotante_Click);
            // 
            // LblCpf
            // 
            this.LblCpf.AutoSize = true;
            this.LblCpf.Location = new System.Drawing.Point(320, 29);
            this.LblCpf.Name = "LblCpf";
            this.LblCpf.Size = new System.Drawing.Size(26, 13);
            this.LblCpf.TabIndex = 52;
            this.LblCpf.Text = "Cpf:";
            // 
            // LblCidade
            // 
            this.LblCidade.AutoSize = true;
            this.LblCidade.Location = new System.Drawing.Point(332, 68);
            this.LblCidade.Name = "LblCidade";
            this.LblCidade.Size = new System.Drawing.Size(43, 13);
            this.LblCidade.TabIndex = 51;
            this.LblCidade.Text = "Cidade:";
            // 
            // LblNome
            // 
            this.LblNome.AutoSize = true;
            this.LblNome.Location = new System.Drawing.Point(27, 29);
            this.LblNome.Name = "LblNome";
            this.LblNome.Size = new System.Drawing.Size(38, 13);
            this.LblNome.TabIndex = 50;
            this.LblNome.Text = "Nome:";
            // 
            // LblEstado
            // 
            this.LblEstado.AutoSize = true;
            this.LblEstado.Location = new System.Drawing.Point(213, 68);
            this.LblEstado.Name = "LblEstado";
            this.LblEstado.RightToLeft = System.Windows.Forms.RightToLeft.No;
            this.LblEstado.Size = new System.Drawing.Size(43, 13);
            this.LblEstado.TabIndex = 49;
            this.LblEstado.Text = "Estado:";
            // 
            // TxtCpf
            // 
            this.TxtCpf.Location = new System.Drawing.Point(323, 45);
            this.TxtCpf.Name = "TxtCpf";
            this.TxtCpf.Size = new System.Drawing.Size(143, 20);
            this.TxtCpf.TabIndex = 48;
            // 
            // TxtCidade
            // 
            this.TxtCidade.Location = new System.Drawing.Point(333, 87);
            this.TxtCidade.Name = "TxtCidade";
            this.TxtCidade.Size = new System.Drawing.Size(105, 20);
            this.TxtCidade.TabIndex = 47;
            // 
            // TxtEstado
            // 
            this.TxtEstado.Location = new System.Drawing.Point(216, 87);
            this.TxtEstado.Name = "TxtEstado";
            this.TxtEstado.Size = new System.Drawing.Size(100, 20);
            this.TxtEstado.TabIndex = 46;
            // 
            // TxtNome
            // 
            this.TxtNome.Location = new System.Drawing.Point(30, 45);
            this.TxtNome.Name = "TxtNome";
            this.TxtNome.Size = new System.Drawing.Size(100, 20);
            this.TxtNome.TabIndex = 45;
            // 
            // LblBusca
            // 
            this.LblBusca.AutoSize = true;
            this.LblBusca.Location = new System.Drawing.Point(11, 218);
            this.LblBusca.Name = "LblBusca";
            this.LblBusca.Size = new System.Drawing.Size(58, 13);
            this.LblBusca.TabIndex = 44;
            this.LblBusca.Text = "Busca por:";
            // 
            // BtnBusca
            // 
            this.BtnBusca.BackgroundImage = global::_3Bimestre.Properties.Resources.BtnBusca_BackgroundImage;
            this.BtnBusca.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.BtnBusca.Location = new System.Drawing.Point(352, 216);
            this.BtnBusca.Name = "BtnBusca";
            this.BtnBusca.Size = new System.Drawing.Size(29, 23);
            this.BtnBusca.TabIndex = 43;
            this.BtnBusca.UseVisualStyleBackColor = true;
            this.BtnBusca.Click += new System.EventHandler(this.BtnBusca_Click);
            // 
            // TxtBusca
            // 
            this.TxtBusca.Location = new System.Drawing.Point(73, 216);
            this.TxtBusca.Name = "TxtBusca";
            this.TxtBusca.Size = new System.Drawing.Size(273, 20);
            this.TxtBusca.TabIndex = 42;
            // 
            // DtgAdotante
            // 
            this.DtgAdotante.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.DtgAdotante.Location = new System.Drawing.Point(12, 255);
            this.DtgAdotante.Name = "DtgAdotante";
            this.DtgAdotante.Size = new System.Drawing.Size(759, 145);
            this.DtgAdotante.TabIndex = 41;
            // 
            // LblTelefone
            // 
            this.LblTelefone.AutoSize = true;
            this.LblTelefone.Location = new System.Drawing.Point(460, 71);
            this.LblTelefone.Name = "LblTelefone";
            this.LblTelefone.Size = new System.Drawing.Size(52, 13);
            this.LblTelefone.TabIndex = 64;
            this.LblTelefone.Text = "Telefone:";
            this.LblTelefone.Click += new System.EventHandler(this.label1_Click);
            // 
            // TxtTelefone
            // 
            this.TxtTelefone.Location = new System.Drawing.Point(463, 87);
            this.TxtTelefone.Name = "TxtTelefone";
            this.TxtTelefone.Size = new System.Drawing.Size(105, 20);
            this.TxtTelefone.TabIndex = 63;
            this.TxtTelefone.TextChanged += new System.EventHandler(this.textBox1_TextChanged);
            // 
            // FrmAdotante
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.LblTelefone);
            this.Controls.Add(this.TxtTelefone);
            this.Controls.Add(this.LblDataNascimento);
            this.Controls.Add(this.DtpDataNascimento);
            this.Controls.Add(this.LblRg);
            this.Controls.Add(this.TxtRg);
            this.Controls.Add(this.LblEndereco);
            this.Controls.Add(this.TxtEndereco);
            this.Controls.Add(this.BtnCancelar);
            this.Controls.Add(this.BtnDelete);
            this.Controls.Add(this.BtnEditar);
            this.Controls.Add(this.BtnNovoAdotante);
            this.Controls.Add(this.LblCpf);
            this.Controls.Add(this.LblCidade);
            this.Controls.Add(this.LblNome);
            this.Controls.Add(this.LblEstado);
            this.Controls.Add(this.TxtCpf);
            this.Controls.Add(this.TxtCidade);
            this.Controls.Add(this.TxtEstado);
            this.Controls.Add(this.TxtNome);
            this.Controls.Add(this.LblBusca);
            this.Controls.Add(this.BtnBusca);
            this.Controls.Add(this.TxtBusca);
            this.Controls.Add(this.DtgAdotante);
            this.Name = "FrmAdotante";
            this.Text = "Pessoas que ja doaram";
            this.Load += new System.EventHandler(this.FrmAdotante_Load);
            ((System.ComponentModel.ISupportInitialize)(this.DtgAdotante)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label LblDataNascimento;
        private System.Windows.Forms.DateTimePicker DtpDataNascimento;
        private System.Windows.Forms.Label LblRg;
        private System.Windows.Forms.TextBox TxtRg;
        private System.Windows.Forms.Label LblEndereco;
        private System.Windows.Forms.TextBox TxtEndereco;
        private System.Windows.Forms.Button BtnCancelar;
        private System.Windows.Forms.Button BtnDelete;
        private System.Windows.Forms.Button BtnEditar;
        private System.Windows.Forms.Button BtnNovoAdotante;
        private System.Windows.Forms.Label LblCpf;
        private System.Windows.Forms.Label LblCidade;
        private System.Windows.Forms.Label LblNome;
        private System.Windows.Forms.Label LblEstado;
        private System.Windows.Forms.TextBox TxtCpf;
        private System.Windows.Forms.TextBox TxtCidade;
        private System.Windows.Forms.TextBox TxtEstado;
        private System.Windows.Forms.TextBox TxtNome;
        private System.Windows.Forms.Label LblBusca;
        private System.Windows.Forms.Button BtnBusca;
        private System.Windows.Forms.TextBox TxtBusca;
        private System.Windows.Forms.DataGridView DtgAdotante;
        private System.Windows.Forms.Label LblTelefone;
        private System.Windows.Forms.TextBox TxtTelefone;
    }
}