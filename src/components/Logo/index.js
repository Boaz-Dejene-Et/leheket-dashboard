import PropTypes from 'prop-types';

const LogoSection = ({ sx, to }) => (
    <div style={{
        color: "#000",
        fontSize: 25,
        fontWeight: 600
    }}>Leheket</div>
);

LogoSection.propTypes = {
    sx: PropTypes.object,
    to: PropTypes.string
};

export default LogoSection;
