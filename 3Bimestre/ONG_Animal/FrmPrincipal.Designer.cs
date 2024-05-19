namespace _3Bimestre.ONG_Animal
{
    partial class FrmPrincipal
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(FrmPrincipal));
            this.MenuPrincipal = new System.Windows.Forms.MenuStrip();
            this.TsmCadastro = new System.Windows.Forms.ToolStripMenuItem();
            this.TsmiAnimal = new System.Windows.Forms.ToolStripMenuItem();
            this.TsmiAdotante = new System.Windows.Forms.ToolStripMenuItem();
            this.TsmAjuda = new System.Windows.Forms.ToolStripMenuItem();
            this.TsmiAjuda = new System.Windows.Forms.ToolStripMenuItem();
            this.StripRodape = new System.Windows.Forms.StatusStrip();
            this.DtgAdocao = new System.Windows.Forms.DataGridView();
            this.TxtBusca = new System.Windows.Forms.TextBox();
            this.BtnBusca = new System.Windows.Forms.Button();
            this.LblBusca = new System.Windows.Forms.Label();
            this.LblAnimal = new System.Windows.Forms.Label();
            this.LblAdotante = new System.Windows.Forms.Label();
            this.LblStatus = new System.Windows.Forms.Label();
            this.LblInformacoes = new System.Windows.Forms.Label();
            this.BtnNovaAdocao = new System.Windows.Forms.Button();
            this.BtnEditar = new System.Windows.Forms.Button();
            this.BtnDelete = new System.Windows.Forms.Button();
            this.BtnCancelar = new System.Windows.Forms.Button();
            this.CblAnimal = new System.Windows.Forms.ComboBox();
            this.CblAdotante = new System.Windows.Forms.ComboBox();
            this.CblStatus = new System.Windows.Forms.ComboBox();
            this.CblInformaçoes = new System.Windows.Forms.ComboBox();
            this.MenuPrincipal.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.DtgAdocao)).BeginInit();
            this.SuspendLayout();
            // 
            // MenuPrincipal
            // 
            this.MenuPrincipal.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.TsmCadastro,
            this.TsmAjuda});
            this.MenuPrincipal.Location = new System.Drawing.Point(0, 0);
            this.MenuPrincipal.Name = "MenuPrincipal";
            this.MenuPrincipal.Size = new System.Drawing.Size(545, 24);
            this.MenuPrincipal.TabIndex = 0;
            this.MenuPrincipal.Text = "menuStrip1";
            // 
            // TsmCadastro
            // 
            this.TsmCadastro.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.TsmiAnimal,
            this.TsmiAdotante});
            this.TsmCadastro.Name = "TsmCadastro";
            this.TsmCadastro.Size = new System.Drawing.Size(71, 20);
            this.TsmCadastro.Text = "Cadastros";
            // 
            // TsmiAnimal
            // 
            this.TsmiAnimal.Name = "TsmiAnimal";
            this.TsmiAnimal.Size = new System.Drawing.Size(123, 22);
            this.TsmiAnimal.Text = "Animal";
            this.TsmiAnimal.Click += new System.EventHandler(this.TsmiAnimal_Click);
            // 
            // TsmiAdotante
            // 
            this.TsmiAdotante.Name = "TsmiAdotante";
            this.TsmiAdotante.Size = new System.Drawing.Size(123, 22);
            this.TsmiAdotante.Text = "Adotante";
            this.TsmiAdotante.Click += new System.EventHandler(this.TsmiAdotante_Click);
            // 
            // TsmAjuda
            // 
            this.TsmAjuda.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.TsmiAjuda});
            this.TsmAjuda.Name = "TsmAjuda";
            this.TsmAjuda.Size = new System.Drawing.Size(50, 20);
            this.TsmAjuda.Text = "Ajuda";
            // 
            // TsmiAjuda
            // 
            this.TsmiAjuda.Name = "TsmiAjuda";
            this.TsmiAjuda.Size = new System.Drawing.Size(105, 22);
            this.TsmiAjuda.Text = "Ajuda";
            this.TsmiAjuda.Click += new System.EventHandler(this.TsmiAjuda_Click);
            // 
            // StripRodape
            // 
            this.StripRodape.Location = new System.Drawing.Point(0, 320);
            this.StripRodape.Name = "StripRodape";
            this.StripRodape.Size = new System.Drawing.Size(545, 22);
            this.StripRodape.TabIndex = 1;
            this.StripRodape.Text = "statusStrip1";
            // 
            // DtgAdocao
            // 
            this.DtgAdocao.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.DtgAdocao.Location = new System.Drawing.Point(12, 204);
            this.DtgAdocao.Name = "DtgAdocao";
            this.DtgAdocao.Size = new System.Drawing.Size(501, 130);
            this.DtgAdocao.TabIndex = 2;
            // 
            // TxtBusca
            // 
            this.TxtBusca.Location = new System.Drawing.Point(74, 178);
            this.TxtBusca.Name = "TxtBusca";
            this.TxtBusca.Size = new System.Drawing.Size(273, 20);
            this.TxtBusca.TabIndex = 3;
            // 
            // BtnBusca
            // 
            this.BtnBusca.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("BtnBusca.BackgroundImage")));
            this.BtnBusca.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.BtnBusca.Location = new System.Drawing.Point(353, 176);
            this.BtnBusca.Name = "BtnBusca";
            this.BtnBusca.Size = new System.Drawing.Size(29, 23);
            this.BtnBusca.TabIndex = 4;
            this.BtnBusca.UseVisualStyleBackColor = true;
            // 
            // LblBusca
            // 
            this.LblBusca.AutoSize = true;
            this.LblBusca.Location = new System.Drawing.Point(12, 180);
            this.LblBusca.Name = "LblBusca";
            this.LblBusca.Size = new System.Drawing.Size(58, 13);
            this.LblBusca.TabIndex = 5;
            this.LblBusca.Text = "Busca por:";
            // 
            // LblAnimal
            // 
            this.LblAnimal.AutoSize = true;
            this.LblAnimal.Location = new System.Drawing.Point(115, 41);
            this.LblAnimal.Name = "LblAnimal";
            this.LblAnimal.Size = new System.Drawing.Size(102, 13);
            this.LblAnimal.TabIndex = 10;
            this.LblAnimal.Text = "Pessoa que adotou:";
            // 
            // LblAdotante
            // 
            this.LblAdotante.AutoSize = true;
            this.LblAdotante.Location = new System.Drawing.Point(9, 44);
            this.LblAdotante.Name = "LblAdotante";
            this.LblAdotante.Size = new System.Drawing.Size(41, 13);
            this.LblAdotante.TabIndex = 11;
            this.LblAdotante.Text = "Animal:";
            // 
            // LblStatus
            // 
            this.LblStatus.AutoSize = true;
            this.LblStatus.Location = new System.Drawing.Point(223, 41);
            this.LblStatus.Name = "LblStatus";
            this.LblStatus.Size = new System.Drawing.Size(106, 13);
            this.LblStatus.TabIndex = 12;
            this.LblStatus.Text = "Situação da adoção:";
            // 
            // LblInformacoes
            // 
            this.LblInformacoes.AutoSize = true;
            this.LblInformacoes.Location = new System.Drawing.Point(336, 41);
            this.LblInformacoes.Name = "LblInformacoes";
            this.LblInformacoes.Size = new System.Drawing.Size(68, 13);
            this.LblInformacoes.TabIndex = 13;
            this.LblInformacoes.Text = "Informações:";
            // 
            // BtnNovaAdocao
            // 
            this.BtnNovaAdocao.BackColor = System.Drawing.Color.Lime;
            this.BtnNovaAdocao.Location = new System.Drawing.Point(12, 86);
            this.BtnNovaAdocao.Name = "BtnNovaAdocao";
            this.BtnNovaAdocao.Size = new System.Drawing.Size(84, 24);
            this.BtnNovaAdocao.TabIndex = 14;
            this.BtnNovaAdocao.Text = "Nova adoção";
            this.BtnNovaAdocao.UseVisualStyleBackColor = false;
            // 
            // BtnEditar
            // 
            this.BtnEditar.BackColor = System.Drawing.Color.Yellow;
            this.BtnEditar.Location = new System.Drawing.Point(118, 86);
            this.BtnEditar.Name = "BtnEditar";
            this.BtnEditar.Size = new System.Drawing.Size(84, 24);
            this.BtnEditar.TabIndex = 15;
            this.BtnEditar.Text = "Editar";
            this.BtnEditar.UseVisualStyleBackColor = false;
            this.BtnEditar.Visible = false;
            // 
            // BtnDelete
            // 
            this.BtnDelete.BackColor = System.Drawing.Color.Red;
            this.BtnDelete.Location = new System.Drawing.Point(224, 86);
            this.BtnDelete.Name = "BtnDelete";
            this.BtnDelete.Size = new System.Drawing.Size(84, 24);
            this.BtnDelete.TabIndex = 16;
            this.BtnDelete.Text = "Excluir";
            this.BtnDelete.UseVisualStyleBackColor = false;
            this.BtnDelete.Visible = false;
            // 
            // BtnCancelar
            // 
            this.BtnCancelar.BackColor = System.Drawing.Color.MistyRose;
            this.BtnCancelar.Location = new System.Drawing.Point(320, 86);
            this.BtnCancelar.Name = "BtnCancelar";
            this.BtnCancelar.Size = new System.Drawing.Size(84, 24);
            this.BtnCancelar.TabIndex = 17;
            this.BtnCancelar.Text = "Cancelar";
            this.BtnCancelar.UseVisualStyleBackColor = false;
            this.BtnCancelar.Visible = false;
            // 
            // CblAnimal
            // 
            this.CblAnimal.FormattingEnabled = true;
            this.CblAnimal.Location = new System.Drawing.Point(12, 59);
            this.CblAnimal.Name = "CblAnimal";
            this.CblAnimal.Size = new System.Drawing.Size(100, 21);
            this.CblAnimal.TabIndex = 18;
            this.CblAnimal.SelectedIndexChanged += new System.EventHandler(this.CblAnimal_SelectedIndexChanged);
            // 
            // CblAdotante
            // 
            this.CblAdotante.FormattingEnabled = true;
            this.CblAdotante.Location = new System.Drawing.Point(118, 59);
            this.CblAdotante.Name = "CblAdotante";
            this.CblAdotante.Size = new System.Drawing.Size(100, 21);
            this.CblAdotante.TabIndex = 19;
            // 
            // CblStatus
            // 
            this.CblStatus.FormattingEnabled = true;
            this.CblStatus.Location = new System.Drawing.Point(224, 59);
            this.CblStatus.Name = "CblStatus";
            this.CblStatus.Size = new System.Drawing.Size(100, 21);
            this.CblStatus.TabIndex = 20;
            // 
            // CblInformaçoes
            // 
            this.CblInformaçoes.FormattingEnabled = true;
            this.CblInformaçoes.Location = new System.Drawing.Point(339, 59);
            this.CblInformaçoes.Name = "CblInformaçoes";
            this.CblInformaçoes.Size = new System.Drawing.Size(100, 21);
            this.CblInformaçoes.TabIndex = 21;
            // 
            // FrmPrincipal
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.ControlDarkDark;
            this.ClientSize = new System.Drawing.Size(545, 342);
            this.Controls.Add(this.CblInformaçoes);
            this.Controls.Add(this.CblStatus);
            this.Controls.Add(this.CblAdotante);
            this.Controls.Add(this.CblAnimal);
            this.Controls.Add(this.BtnCancelar);
            this.Controls.Add(this.BtnDelete);
            this.Controls.Add(this.BtnEditar);
            this.Controls.Add(this.BtnNovaAdocao);
            this.Controls.Add(this.LblInformacoes);
            this.Controls.Add(this.LblStatus);
            this.Controls.Add(this.LblAdotante);
            this.Controls.Add(this.LblAnimal);
            this.Controls.Add(this.LblBusca);
            this.Controls.Add(this.BtnBusca);
            this.Controls.Add(this.TxtBusca);
            this.Controls.Add(this.DtgAdocao);
            this.Controls.Add(this.StripRodape);
            this.Controls.Add(this.MenuPrincipal);
            this.MainMenuStrip = this.MenuPrincipal;
            this.Name = "FrmPrincipal";
            this.Text = " ";
            this.MenuPrincipal.ResumeLayout(false);
            this.MenuPrincipal.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.DtgAdocao)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.MenuStrip MenuPrincipal;
        private System.Windows.Forms.ToolStripMenuItem TsmCadastro;
        private System.Windows.Forms.ToolStripMenuItem TsmiAnimal;
        private System.Windows.Forms.ToolStripMenuItem TsmiAdotante;
        private System.Windows.Forms.ToolStripMenuItem TsmAjuda;
        private System.Windows.Forms.ToolStripMenuItem TsmiAjuda;
        private System.Windows.Forms.StatusStrip StripRodape;
        private System.Windows.Forms.DataGridView DtgAdocao;
        private System.Windows.Forms.TextBox TxtBusca;
        private System.Windows.Forms.Button BtnBusca;
        private System.Windows.Forms.Label LblBusca;
        private System.Windows.Forms.Label LblAnimal;
        private System.Windows.Forms.Label LblAdotante;
        private System.Windows.Forms.Label LblStatus;
        private System.Windows.Forms.Label LblInformacoes;
        private System.Windows.Forms.Button BtnNovaAdocao;
        private System.Windows.Forms.Button BtnEditar;
        private System.Windows.Forms.Button BtnDelete;
        private System.Windows.Forms.Button BtnCancelar;
        private System.Windows.Forms.ComboBox CblAnimal;
        private System.Windows.Forms.ComboBox CblAdotante;
        private System.Windows.Forms.ComboBox CblStatus;
        private System.Windows.Forms.ComboBox CblInformaçoes;
    }
}

