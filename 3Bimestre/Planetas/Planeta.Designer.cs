namespace _3Bimestre
{
    partial class Planeta
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Planeta));
            this.lbl_Planeta = new System.Windows.Forms.Label();
            this.gBox_info = new System.Windows.Forms.GroupBox();
            this.lbl_distTerra = new System.Windows.Forms.Label();
            this.lbl_showDistTerra = new System.Windows.Forms.Label();
            this.lbl_distSol = new System.Windows.Forms.Label();
            this.lbl_showDistSol = new System.Windows.Forms.Label();
            this.lbl_dynType = new System.Windows.Forms.Label();
            this.lbl_type = new System.Windows.Forms.Label();
            this.gBox_curios = new System.Windows.Forms.GroupBox();
            this.lbl_curiosities = new System.Windows.Forms.Label();
            this.gBox_info.SuspendLayout();
            this.gBox_curios.SuspendLayout();
            this.SuspendLayout();
            // 
            // lbl_Planeta
            // 
            this.lbl_Planeta.AutoSize = true;
            this.lbl_Planeta.BackColor = System.Drawing.Color.Transparent;
            this.lbl_Planeta.Font = new System.Drawing.Font("Microsoft Sans Serif", 25.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lbl_Planeta.ForeColor = System.Drawing.SystemColors.Control;
            this.lbl_Planeta.Location = new System.Drawing.Point(320, 18);
            this.lbl_Planeta.Name = "lbl_Planeta";
            this.lbl_Planeta.Size = new System.Drawing.Size(192, 39);
            this.lbl_Planeta.TabIndex = 0;
            this.lbl_Planeta.Text = "[PLANETA]";
            this.lbl_Planeta.Click += new System.EventHandler(this.label1_Click);
            // 
            // gBox_info
            // 
            this.gBox_info.BackColor = System.Drawing.SystemColors.MenuHighlight;
            this.gBox_info.Controls.Add(this.lbl_distTerra);
            this.gBox_info.Controls.Add(this.lbl_showDistTerra);
            this.gBox_info.Controls.Add(this.lbl_distSol);
            this.gBox_info.Controls.Add(this.lbl_showDistSol);
            this.gBox_info.Controls.Add(this.lbl_dynType);
            this.gBox_info.Controls.Add(this.lbl_type);
            this.gBox_info.Location = new System.Drawing.Point(25, 101);
            this.gBox_info.Name = "gBox_info";
            this.gBox_info.Size = new System.Drawing.Size(351, 212);
            this.gBox_info.TabIndex = 1;
            this.gBox_info.TabStop = false;
            this.gBox_info.Text = "Informações";
            this.gBox_info.Enter += new System.EventHandler(this.groupBox1_Enter);
            // 
            // lbl_distTerra
            // 
            this.lbl_distTerra.AutoSize = true;
            this.lbl_distTerra.Location = new System.Drawing.Point(299, 185);
            this.lbl_distTerra.Name = "lbl_distTerra";
            this.lbl_distTerra.Size = new System.Drawing.Size(38, 13);
            this.lbl_distTerra.TabIndex = 5;
            this.lbl_distTerra.Text = "[TIPO]";
            this.lbl_distTerra.TextAlign = System.Drawing.ContentAlignment.TopRight;
            this.lbl_distTerra.Click += new System.EventHandler(this.lbl_distTerra_Click);
            // 
            // lbl_showDistTerra
            // 
            this.lbl_showDistTerra.AutoSize = true;
            this.lbl_showDistTerra.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lbl_showDistTerra.Location = new System.Drawing.Point(6, 180);
            this.lbl_showDistTerra.Name = "lbl_showDistTerra";
            this.lbl_showDistTerra.Size = new System.Drawing.Size(239, 20);
            this.lbl_showDistTerra.TabIndex = 4;
            this.lbl_showDistTerra.Text = "Distância em relação à Terra";
            // 
            // lbl_distSol
            // 
            this.lbl_distSol.AutoSize = true;
            this.lbl_distSol.Cursor = System.Windows.Forms.Cursors.Default;
            this.lbl_distSol.Location = new System.Drawing.Point(299, 108);
            this.lbl_distSol.Name = "lbl_distSol";
            this.lbl_distSol.Size = new System.Drawing.Size(38, 13);
            this.lbl_distSol.TabIndex = 3;
            this.lbl_distSol.Text = "[TIPO]";
            this.lbl_distSol.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.lbl_distSol.Click += new System.EventHandler(this.lbl_distSol_Click);
            // 
            // lbl_showDistSol
            // 
            this.lbl_showDistSol.AutoSize = true;
            this.lbl_showDistSol.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lbl_showDistSol.Location = new System.Drawing.Point(6, 103);
            this.lbl_showDistSol.Name = "lbl_showDistSol";
            this.lbl_showDistSol.Size = new System.Drawing.Size(233, 20);
            this.lbl_showDistSol.TabIndex = 2;
            this.lbl_showDistSol.Text = "Distância em relação ao Sol";
            this.lbl_showDistSol.Click += new System.EventHandler(this.label1_Click_1);
            // 
            // lbl_dynType
            // 
            this.lbl_dynType.AutoSize = true;
            this.lbl_dynType.Location = new System.Drawing.Point(299, 44);
            this.lbl_dynType.Name = "lbl_dynType";
            this.lbl_dynType.Size = new System.Drawing.Size(38, 13);
            this.lbl_dynType.TabIndex = 1;
            this.lbl_dynType.Text = "[TIPO]";
            this.lbl_dynType.Click += new System.EventHandler(this.lbl_dynType_Click);
            // 
            // lbl_type
            // 
            this.lbl_type.AutoSize = true;
            this.lbl_type.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lbl_type.Location = new System.Drawing.Point(10, 37);
            this.lbl_type.Name = "lbl_type";
            this.lbl_type.Size = new System.Drawing.Size(48, 20);
            this.lbl_type.TabIndex = 0;
            this.lbl_type.Text = "Tipo:";
            this.lbl_type.Click += new System.EventHandler(this.lbl_type_Click);
            // 
            // gBox_curios
            // 
            this.gBox_curios.BackColor = System.Drawing.SystemColors.MenuHighlight;
            this.gBox_curios.Controls.Add(this.lbl_curiosities);
            this.gBox_curios.Location = new System.Drawing.Point(425, 101);
            this.gBox_curios.Name = "gBox_curios";
            this.gBox_curios.Size = new System.Drawing.Size(351, 212);
            this.gBox_curios.TabIndex = 6;
            this.gBox_curios.TabStop = false;
            this.gBox_curios.Text = "Curiosidades";
            this.gBox_curios.Enter += new System.EventHandler(this.groupBox1_Enter_1);
            // 
            // lbl_curiosities
            // 
            this.lbl_curiosities.Location = new System.Drawing.Point(6, 37);
            this.lbl_curiosities.Name = "lbl_curiosities";
            this.lbl_curiosities.Size = new System.Drawing.Size(339, 163);
            this.lbl_curiosities.TabIndex = 3;
            this.lbl_curiosities.Text = "[CURIOSIDADES]";
            // 
            // Planeta
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.gBox_curios);
            this.Controls.Add(this.gBox_info);
            this.Controls.Add(this.lbl_Planeta);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.Fixed3D;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MaximizeBox = false;
            this.Name = "Planeta";
            this.Text = "[PLANETA]";
            this.Load += new System.EventHandler(this.Planeta_Load);
            this.gBox_info.ResumeLayout(false);
            this.gBox_info.PerformLayout();
            this.gBox_curios.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private System.Windows.Forms.Label lbl_Planeta;
        private System.Windows.Forms.GroupBox gBox_info;
        private System.Windows.Forms.Label lbl_type;
        private System.Windows.Forms.Label lbl_showDistSol;
        private System.Windows.Forms.Label lbl_dynType;
        private System.Windows.Forms.Label lbl_distSol;
        private System.Windows.Forms.Label lbl_showDistTerra;
        private System.Windows.Forms.Label lbl_distTerra;
        private System.Windows.Forms.GroupBox gBox_curios;
        private System.Windows.Forms.Label lbl_curiosities;
    }
}