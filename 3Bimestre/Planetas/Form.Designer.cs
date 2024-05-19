namespace _3Bimestre
{
    partial class FrmPlanetas
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(FrmPlanetas));
            this.Mercúrio = new System.Windows.Forms.RadioButton();
            this.Vênus = new System.Windows.Forms.RadioButton();
            this.Terra = new System.Windows.Forms.RadioButton();
            this.Marte = new System.Windows.Forms.RadioButton();
            this.Júpiter = new System.Windows.Forms.RadioButton();
            this.Saturno = new System.Windows.Forms.RadioButton();
            this.Urano = new System.Windows.Forms.RadioButton();
            this.Netuno = new System.Windows.Forms.RadioButton();
            this.SuspendLayout();
            // 
            // Mercúrio
            // 
            this.Mercúrio.AutoSize = true;
            this.Mercúrio.BackColor = System.Drawing.Color.Transparent;
            this.Mercúrio.Location = new System.Drawing.Point(36, 280);
            this.Mercúrio.Name = "Mercúrio";
            this.Mercúrio.Size = new System.Drawing.Size(66, 17);
            this.Mercúrio.TabIndex = 8;
            this.Mercúrio.Text = "Mercúrio";
            this.Mercúrio.UseVisualStyleBackColor = false;
            this.Mercúrio.CheckedChanged += new System.EventHandler(this.mercurio_CheckedChanged);
            // 
            // Vênus
            // 
            this.Vênus.AutoSize = true;
            this.Vênus.BackColor = System.Drawing.Color.Transparent;
            this.Vênus.Location = new System.Drawing.Point(318, 236);
            this.Vênus.Name = "Vênus";
            this.Vênus.Size = new System.Drawing.Size(55, 17);
            this.Vênus.TabIndex = 1;
            this.Vênus.Text = "Vênus";
            this.Vênus.UseVisualStyleBackColor = false;
            this.Vênus.CheckedChanged += new System.EventHandler(this.venus_CheckedChanged);
            // 
            // Terra
            // 
            this.Terra.AutoSize = true;
            this.Terra.BackColor = System.Drawing.Color.Transparent;
            this.Terra.Location = new System.Drawing.Point(280, 283);
            this.Terra.Name = "Terra";
            this.Terra.Size = new System.Drawing.Size(50, 17);
            this.Terra.TabIndex = 2;
            this.Terra.Text = "Terra";
            this.Terra.UseVisualStyleBackColor = false;
            this.Terra.CheckedChanged += new System.EventHandler(this.terra_CheckedChanged);
            // 
            // Marte
            // 
            this.Marte.AutoSize = true;
            this.Marte.BackColor = System.Drawing.Color.Transparent;
            this.Marte.Location = new System.Drawing.Point(188, 323);
            this.Marte.Name = "Marte";
            this.Marte.Size = new System.Drawing.Size(52, 17);
            this.Marte.TabIndex = 3;
            this.Marte.Text = "Marte";
            this.Marte.UseVisualStyleBackColor = false;
            this.Marte.CheckedChanged += new System.EventHandler(this.marte_CheckedChanged);
            // 
            // Júpiter
            // 
            this.Júpiter.AutoSize = true;
            this.Júpiter.BackColor = System.Drawing.Color.Transparent;
            this.Júpiter.Location = new System.Drawing.Point(444, 288);
            this.Júpiter.Name = "Júpiter";
            this.Júpiter.Size = new System.Drawing.Size(56, 17);
            this.Júpiter.TabIndex = 4;
            this.Júpiter.Text = "Júpiter";
            this.Júpiter.UseVisualStyleBackColor = false;
            this.Júpiter.CheckedChanged += new System.EventHandler(this.jupiter_CheckedChanged);
            // 
            // Saturno
            // 
            this.Saturno.AutoSize = true;
            this.Saturno.BackColor = System.Drawing.Color.Transparent;
            this.Saturno.Location = new System.Drawing.Point(392, 379);
            this.Saturno.Name = "Saturno";
            this.Saturno.Size = new System.Drawing.Size(62, 17);
            this.Saturno.TabIndex = 5;
            this.Saturno.Text = "Saturno";
            this.Saturno.UseVisualStyleBackColor = false;
            this.Saturno.CheckedChanged += new System.EventHandler(this.saturno_CheckedChanged);
            // 
            // Urano
            // 
            this.Urano.AutoSize = true;
            this.Urano.BackColor = System.Drawing.Color.Transparent;
            this.Urano.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.Urano.Location = new System.Drawing.Point(678, 258);
            this.Urano.Name = "Urano";
            this.Urano.Size = new System.Drawing.Size(54, 17);
            this.Urano.TabIndex = 6;
            this.Urano.Text = "Urano";
            this.Urano.UseVisualStyleBackColor = false;
            this.Urano.CheckedChanged += new System.EventHandler(this.urano_CheckedChanged);
            // 
            // Netuno
            // 
            this.Netuno.AutoSize = true;
            this.Netuno.BackColor = System.Drawing.Color.Transparent;
            this.Netuno.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.Netuno.Location = new System.Drawing.Point(647, 395);
            this.Netuno.Name = "Netuno";
            this.Netuno.Size = new System.Drawing.Size(60, 17);
            this.Netuno.TabIndex = 7;
            this.Netuno.Text = "Netuno";
            this.Netuno.UseVisualStyleBackColor = false;
            this.Netuno.CheckedChanged += new System.EventHandler(this.netuno_CheckedChanged);
            // 
            // FrmPlanetas
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackgroundImage = global::_3Bimestre.Properties.Resources._4a8489df1c3eb6333c4dccd1638d6e83; 
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.Mercúrio);
            this.Controls.Add(this.Netuno);
            this.Controls.Add(this.Urano);
            this.Controls.Add(this.Saturno);
            this.Controls.Add(this.Júpiter);
            this.Controls.Add(this.Marte);
            this.Controls.Add(this.Terra);
            this.Controls.Add(this.Vênus);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.Fixed3D;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MaximizeBox = false;
            this.Name = "FrmPlanetas";
            this.Text = "Form_Planetas";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private System.Windows.Forms.RadioButton Vênus;
        private System.Windows.Forms.RadioButton Terra;
        private System.Windows.Forms.RadioButton Marte;
        private System.Windows.Forms.RadioButton Júpiter;
        private System.Windows.Forms.RadioButton Saturno;
        private System.Windows.Forms.RadioButton Urano;
        private System.Windows.Forms.RadioButton Netuno;
        private System.Windows.Forms.RadioButton Mercúrio;
    }
}

